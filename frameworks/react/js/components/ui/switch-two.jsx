import * as React from "react";
import { cn } from "../../lib/utils";

const Switch = React.forwardRef(
  (
    { className, checked, defaultChecked, onCheckedChange, disabled, ...props },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

    const handleToggle = (e) => {
      if (disabled) return;
      const currentValue = checked !== undefined ? checked : isChecked;
      const newValue = !currentValue;
      if (checked !== undefined) {
        onCheckedChange?.(newValue);
      } else {
        setIsChecked(newValue);
      }
    };

    const currentValue = checked !== undefined ? checked : isChecked;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={currentValue}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          currentValue ? "bg-green-300" : "bg-slate-300",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-default-primary shadow-lg ring-0 transition-transform",
            currentValue ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
