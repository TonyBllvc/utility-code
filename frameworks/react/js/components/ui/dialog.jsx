// src/components/ui/dialog.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Dialog = ({
  open,
  onOpenChange,
  zIndex = 50,
  bgCloseable = true,
  children,
}) => {
  return (
    <>
      {open && (
        <div
          className={`fixed inset-0 z-[${zIndex}] flex items-center justify-center`}
        >
          {children}
          {bgCloseable && (
            <div
              className="fixed inset-0 bg-foreground/80"
              onClick={() => onOpenChange?.(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

const DialogTrigger = ({ asChild, children, onClick }) => {
  return React.cloneElement(children, {
    onClick: (e) => {
      onClick?.(e);
      if (children.props.onClick) children.props.onClick(e);
    },
  });
};

const DialogOverlay = ({ className }) => (
  <div className={cn("fixed inset-0 bg-foreground/80", className)} />
);

const DialogContent = ({ className, children, onClose, closable = true }) => {
  const content = (
    <div className="fixed inset-0 z-[99999] bg-foreground/50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Centered modal */}
      <div
        className={cn(
          "relative z-50 w-full max-w-md md:max-w-[600px] sm:max-w-xl lg:max-w-[900px] rounded-lg bg-card text-card-foreground p-6 shadow-lg",
          "max-h-[90vh] overflow-y-auto",
          "border border-border",
          className,
        )}
      >
        {children}

        {closable && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-brand-red transition-all duration-700" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "pr-6 pt-6 flex flex-col space-y-1.5 text-left text-lg md:text-xl font-semibold text-card-foreground",
      className,
    )}
    {...props}
  />
);

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "px-6 pb-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }) => (
  <h2
    className={cn(
      "text-xl font-semibold leading-none text-start tracking-tight text-card-foreground",
      className,
    )}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

const useDialogDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return { onOpen, onClose, isOpen, setIsOpen };
};

export {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  useDialogDisclosure,
};
