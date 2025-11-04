import React, { forwardRef } from "react";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";

const SIZE_MAP = { sm: 72, md: 96, lg: 120 };

const CardCircle = forwardRef(function CardCircle(
  {
    image, // string URL for image
    alt = "",
    children, // can be an icon fallback
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
      aria-label={
        ariaLabel ??
        alt ??
        (typeof children === "string" ? children : undefined)
      }
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
      {image ? (
        <img
          src={image}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : children ? (
        // if children provided (e.g. an icon), render it centered
        children
      ) : (
        // fallback icon when no image or children
        <MusicalNoteIcon
          className="h-8 w-8 text-[var(--primary-color)]"
          aria-hidden="true"
        />
      )}
    </div>
  );
});

export default CardCircle;
