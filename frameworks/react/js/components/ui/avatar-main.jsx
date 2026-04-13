// src/components/ui/AvatarMain.jsx
import React from "react";
import { cn } from "../../lib/utils";
import { User } from "lucide-react";

const AvatarMain = ({ size = "md", name, src, className, ...props }) => {
  const breakpoints = ["", "sm:", "md:", "lg:", "xl:", "2xl:"];

  let sizeArray = Array.isArray(size) ? size : [size];

  while (sizeArray.length < 6) {
    sizeArray.push(sizeArray[sizeArray.length - 1] || "md");
  }

  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-14 w-14 text-xl",
    "2xl": "h-16 w-16 text-2xl",
  };

  const responsiveSizeClass = sizeArray
    .map((s, index) => {
      const prefix = breakpoints[index];
      const cls = sizeClasses[s] || sizeClasses.md;
      return prefix + cls;
    })
    .join(" ");

  const getInitials = (name) => {
    if (!name) return null;
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getBgColor = (name) => {
    // No name at all — use muted surface token via className fallback below
    if (!name) return "";

    const charCode = name.trim().toUpperCase().charCodeAt(0) - 65;
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-green-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-sky-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-purple-500",
      "bg-fuchsia-500",
      "bg-pink-500",
      "bg-rose-500",
      "bg-red-600",
      "bg-orange-600",
      "bg-amber-600",
      "bg-yellow-600",
      "bg-lime-600",
      "bg-green-600",
      "bg-emerald-600",
      "bg-teal-600",
      "bg-cyan-600",
    ];

    return colors[charCode % colors.length] + " text-white";
  };

  const initials = getInitials(name);
  const bgColorClass = getBgColor(name);

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full font-semibold items-center justify-center border border-border",
        responsiveSizeClass,
        initials ? bgColorClass : "bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name || "avatar"}
          className="h-full w-full object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User className="h-5 w-5 opacity-70" />
      )}
    </div>
  );
};

export { AvatarMain };
