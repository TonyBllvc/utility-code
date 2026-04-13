import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

const DropdownMenuTrigger = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={triggerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "px-3 py-2 rounded-md border border-border bg-background text-foreground",
          className,
        )}
      >
        {children[0]}
      </button>
      {open && <div className="absolute mt-2">{children[1]}</div>}
    </div>
  );
};

const DropdownMenuContent = ({ children, className }) => {
  return (
    <div
      className={cn(
        "z-50 min-w-[8rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = ({ children, inset, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownMenuCheckboxItem = ({
  children,
  checked,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
};

const DropdownMenuRadioItem = ({ children, selected, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selected && <Circle className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </div>
  );
};

const DropdownMenuLabel = ({ children, inset, className }) => (
  <div
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className,
    )}
  >
    {children}
  </div>
);

const DropdownMenuSeparator = ({ className }) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
);

const DropdownMenuShortcut = ({ children, className }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
    {children}
  </span>
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};
