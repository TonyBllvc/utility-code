// src/components/ui/dialog-two.jsx
import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const DialogContext = React.createContext({
  open: false,
  setOpen: () => {},
});

const Dialog = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = React.useCallback(
    (value) => {
      if (controlledOpen !== undefined) {
        onOpenChange && onOpenChange(value);
      } else {
        setInternalOpen(value);
      }
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = "Dialog";

const DialogTrigger = React.forwardRef(
  ({ className, children, asChild = false, ...props }, ref) => {
    const { setOpen } = React.useContext(DialogContext);
    const onClick = () => setOpen(true);

    if (asChild) {
      return React.cloneElement(React.Children.only(children), {
        onClick: (e) => {
          children.props.onClick?.(e);
          onClick();
        },
        ref,
        ...props,
      });
    }

    return (
      <button
        type="button"
        ref={ref}
        onClick={onClick}
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = ({ children, container = document.body }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, container) : null;
};
DialogPortal.displayName = "DialogPortal";

const DialogClose = React.forwardRef(
  ({ className, children, asChild = false, ...props }, ref) => {
    const { setOpen } = React.useContext(DialogContext);
    const onClick = () => setOpen(false);

    if (asChild) {
      return React.cloneElement(React.Children.only(children), {
        onClick: (e) => {
          children.props.onClick?.(e);
          onClick();
        },
        ref,
        ...props,
      });
    }

    return (
      <button
        type="button"
        ref={ref}
        onClick={onClick}
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DialogClose.displayName = "DialogClose";

const DialogOverlay = React.forwardRef(
  ({ className, dataState, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-foreground/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      data-state={dataState}
      {...props}
    />
  ),
);
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DialogContext);
    const [mounted, setMounted] = React.useState(false);
    const timeoutRef = React.useRef(null);

    React.useEffect(() => {
      if (open) {
        setMounted(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      } else {
        timeoutRef.current = setTimeout(() => setMounted(false), 300);
      }
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [open]);

    if (!mounted) return null;

    const dataState = open ? "open" : "closed";

    const handleAnimationEnd = () => {
      if (dataState === "closed") {
        setMounted(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    return (
      <DialogPortal>
        <DialogOverlay dataState={dataState} />
        <div
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card text-card-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className,
          )}
          data-state={dataState}
          onAnimationEnd={handleAnimationEnd}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-card data-[state=open]:text-brand-red"
            onClick={() => setOpen(false)}
            data-state={dataState}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-card-foreground",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
