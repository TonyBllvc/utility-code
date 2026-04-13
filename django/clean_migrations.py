#!/usr/bin/env python3
"""
clean_migrations.py
-------------------
Drop this file in the ROOT of your Django project (same level as manage.py).
Run it with:

    python clean_migrations.py                                            # dry-run (preview only)
    python clean_migrations.py --execute                                  # actually delete files
    python clean_migrations.py --root /path/to/your/project --execute     # run delete from different directory

What it does:
  - Auto-discovers every app that has a migrations/ folder
  - Deletes every .py migration file EXCEPT __init__.py
  - Deletes every .pyc file inside migrations/__pycache__/
  - Deletes the __pycache__ directory itself (if empty afterwards)
  - Leaves the migrations/ folder and its __init__.py intact so
    Django can still detect the app as migration-ready.
"""

import os
import shutil
import argparse
from pathlib import Path


# ── ANSI colours ────────────────────────────────────────────────────────────
RED    = "\033[91m"
GREEN  = "\033[92m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"


def find_migration_dirs(root: Path) -> list[Path]:
    """
    Walk the project tree and return every migrations/ directory that
    looks like a real Django migrations package (contains __init__.py).
    Skips common non-project folders (venv, node_modules, .git, etc.).
    """
    skip_dirs = {
        "venv", ".venv", "env", ".env",
        "node_modules", ".git", "__pycache__",
        "site-packages", "dist", "build",
    }

    migration_dirs = []

    for dirpath, dirnames, filenames in os.walk(root):
        # Prune directories we never want to descend into
        dirnames[:] = [
            d for d in dirnames
            if d not in skip_dirs and not d.startswith(".")
        ]

        current = Path(dirpath)

        if current.name == "migrations" and "__init__.py" in filenames:
            migration_dirs.append(current)

    return sorted(migration_dirs)


def files_to_delete(migration_dir: Path) -> tuple[list[Path], list[Path]]:
    """
    Return (migration_files, pycache_files) that should be removed.
    migration_files : *.py inside migrations/ except __init__.py
    pycache_files   : everything inside migrations/__pycache__/
    """
    py_files = [
        f for f in migration_dir.glob("*.py")
        if f.name != "__init__.py"
    ]

    pycache_dir = migration_dir / "__pycache__"
    pyc_files = list(pycache_dir.iterdir()) if pycache_dir.exists() else []

    return py_files, pyc_files


def clean_migrations(root: Path, execute: bool) -> None:
    mode_label = (
        f"{GREEN}{BOLD}EXECUTE MODE{RESET}"
        if execute
        else f"{YELLOW}{BOLD}DRY-RUN MODE{RESET} (pass --execute to actually delete)"
    )
    print(f"\n{CYAN}{BOLD}Django Migration Cleaner{RESET}  —  {mode_label}")
    print(f"Project root: {root}\n")
    print("─" * 60)

    migration_dirs = find_migration_dirs(root)

    if not migration_dirs:
        print(f"{YELLOW}No migrations/ directories found. Nothing to do.{RESET}")
        return

    total_py  = 0
    total_pyc = 0

    for mdir in migration_dirs:
        # Derive a friendly app name relative to the project root
        try:
            rel = mdir.parent.relative_to(root)
            app_label = str(rel).replace(os.sep, ".")
        except ValueError:
            app_label = str(mdir.parent)

        py_files, pyc_files = files_to_delete(mdir)

        if not py_files and not pyc_files:
            print(f"  {GREEN}✓{RESET}  {app_label}  — already clean, skipping")
            continue

        print(f"\n  {BOLD}{app_label}{RESET}  ({mdir})")

        for f in py_files:
            print(f"    {RED}delete{RESET}  {f.name}")
            if execute:
                f.unlink()
            total_py += 1

        pycache_dir = mdir / "__pycache__"
        if pyc_files:
            print(f"    {RED}delete{RESET}  __pycache__/  ({len(pyc_files)} file(s))")
            if execute:
                shutil.rmtree(pycache_dir, ignore_errors=True)
            total_pyc += len(pyc_files)

    print("\n" + "─" * 60)
    summary_action = "Deleted" if execute else "Would delete"
    print(
        f"{BOLD}{summary_action}:{RESET}  "
        f"{total_py} migration file(s),  "
        f"{total_pyc} pycache file(s)  "
        f"across {len(migration_dirs)} app(s)."
    )

    if not execute:
        print(
            f"\n{YELLOW}This was a dry-run. "
            f"Re-run with {BOLD}--execute{RESET}{YELLOW} to apply changes.{RESET}\n"
        )
    else:
        print(
            f"\n{GREEN}{BOLD}Done!{RESET} "
            "You can now run  "
            f"{CYAN}python manage.py makemigrations{RESET}  "
            "to start fresh.\n"
        )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Auto-clean Django migration files across all apps.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Actually delete files (default is dry-run / preview only).",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("."),
        help="Path to the Django project root (default: current directory).",
    )
    args = parser.parse_args()

    project_root = args.root.resolve()

    if not project_root.is_dir():
        print(f"{RED}Error: '{project_root}' is not a directory.{RESET}")
        raise SystemExit(1)

    clean_migrations(root=project_root, execute=args.execute)


if __name__ == "__main__":
    main()