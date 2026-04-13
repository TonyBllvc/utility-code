import React, { useState } from "react";
import { cn } from "../../lib/utils";

/**
 * A customizable toggle switch component with both controlled and
 * uncontrolled behavior support.
 *
 * **Behavior**
 * - If `checked` is provided → the component becomes **controlled**.
 * - If `checked` is not provided → it falls back to internal state (`defaultChecked`).
 * - `onChange` receives the click event and the new boolean value.
 *
 * **Accessibility**
 * - Uses `role="switch"` and `aria-checked` for proper screen-reader behavior.
 *
 * **Styling**
 * - Uses utility classes and `cn()` for merging custom class names.
 * - Visually animates the thumb based on checked state.
 *
 * **Props**
 * @param {object} props
 * @param {string} [props.className] - Optional custom class names.
 * @param {boolean} [props.checked] - Controlled state for the switch.
 * @param {boolean} [props.defaultChecked=false] - Initial state for uncontrolled usage.
 * @param {function} [props.onChange] - Callback fired on toggle. Receives `(event, newValue)`.
 * @param {boolean} [props.disabled] - Disables interaction and reduces opacity.
 * @param {React.Ref} ref - Forwarded ref for the root button element.
 *
 * @returns {JSX.Element} The switch toggle component.
 *
 * @example
 * // Controlled usage
 * <Switch checked={isActive} onChange={(e, v) => setIsActive(v)} />
 *
 * @example
 * // Uncontrolled usage
 * <Switch defaultChecked />
 *
 * @example
 * // Disabled
 * <Switch disabled />
 */
const Switch = React.forwardRef(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleToggle = (e) => {
      if (disabled) return;
      const newValue = !isChecked;
      setIsChecked(newValue);
      if (onChange) {
        onChange(e, newValue);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked !== undefined ? checked : isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
            "disabled:cursor-not-allowed disabled:opacity-50",
          (checked !== undefined ? checked : isChecked)
            ? "bg-green-300"
            : "bg-gray-300",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-default-primary shadow-lg ring-0 transition-transform",
            (checked !== undefined ? checked : isChecked)
              ? "translate-x-5"
              : "translate-x-0"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };


