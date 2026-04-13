// src/components/ui/dropdown-menu-two.jsx
import React, { createContext, useContext, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const DropdownMenuContext = createContext(null);

function DropdownMenu({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  children,
  size = "default",
  arrow = true,
  className,
  ...props
}) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) {
    throw new Error("DropdownMenuTrigger must be used inside DropdownMenu");
  }

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn("cursor-pointer", className)}
      onClick={() => ctx.setOpen(!ctx.open)}
      {...props}
    >
      <div className="flex flex-row justify-center items-center">
        {children}
        {arrow && (
          <>
            {ctx.open ? (
              <ChevronUp className="ml-1 h-4 w-4 opacity-70" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
            )}
          </>
        )}
      </div>
    </Button>
  );
}

function DropdownMenuContent({ children, className, align = "end" }) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) {
    throw new Error("DropdownMenuContent must be used inside DropdownMenu");
  }

  if (!ctx.open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => ctx.setOpen(false)} />
      <div
        className={cn(
          "absolute right-0 mt-2 w-72 sm:w-80 origin-top-right z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-border focus:outline-none max-h-[70vh] overflow-y-auto",
          "transition-all duration-200 ease-out",
          ctx.open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
          align === "start" ? "left-0" : "right-0",
          className,
        )}
      >
        <div className="py-1">{children}</div>
      </div>
    </>
  );
}

function DropdownMenuItem({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator() {
  return <div className="my-1 border-t border-border" />;
}

function DropdownMenuGroup({ children }) {
  return <div className="py-1">{children}</div>;
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
};
