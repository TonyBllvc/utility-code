import React from "react";
import { cn } from "../../lib/utils"; // your simple cn helper

// Variant styles (edit color usage later)
const variantClasses = {
  default:
    "border-transparent bg-default-primary text-white transition-all duration-500 hover:bg-primary/90",
  green:
    "border-transparent bg-default-primary text-white transition-all duration-500 hover:bg-default-primary/90",
  orange:
    "border-transparent bg-default-secondary text-white transition-all duration-500 hover:bg-default-secondary/90",
  blue:
    "border-transparent bg-default-blue text-white transition-all duration-500 hover:bg-default-blue/80",
  red:
    "border-transparent bg-default-red text-white transition-all duration-500 hover:bg-default-red/80",
  disabled:
    "border-transparent bg-gray-400 text-white transition-all duration-500 hover:bg-gray-500/80",
  outline: "text-default-text",
};

const baseClasses =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold " +
  "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

export { Badge };
