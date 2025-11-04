import React, { forwardRef } from "react";

const SIZE_MAP = { sm: 72, md: 96, lg: 120 };

const CardCircle = forwardRef(function CardCircle(
  {
    children,
    size = "md", // sm | md | lg | number
    selected = false, // subtle ring when true
    onClick,
    className = "",
    style = {},
    ariaLabel,
    ...rest
  },
  ref
) {
  const px = typeof size === "number" ? size : SIZE_MAP[size] ?? SIZE_MAP.md;

  const base = "rounded-full flex items-center justify-center overflow-hidden";
  const interactive = onClick ? "cursor-pointer" : "";
  const selectedClass = selected ? "ring-2 ring-[var(--primary-color)]" : "";

  function handleKeyDown(e) {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(e);
    }
  }

  return (
    <div
      ref={ref}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      aria-pressed={onClick ? selected : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`${base} ${interactive} ${selectedClass} ${className}`}
      style={{
        width: px,
        height: px,
        background: "var(--bg-light-color)",
        ...style,
      }}
      {...rest}
    >
      {/* If user passes an <img/> as children it will be clipped/fit automatically */}
      {children}
    </div>
  );
});

export default CardCircle;
