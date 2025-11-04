import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";

const SIZE_MAP = { sm: 72, md: 96, lg: 120 };

const CardCircle = forwardRef(function CardCircle(
  {
    image,
    alt = "",
    children,
    size = "md",
    selected = false,
    onClick,
    className = "",
    style = {},
    ariaLabel,
    ...rest
  },
  ref
) {
  const px = typeof size === "number" ? size : SIZE_MAP[size] ?? SIZE_MAP.md;
  const interactive = onClick ? "cursor-pointer" : "";

  function handleKeyDown(e) {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(e);
    }
  }

  // Visual tokens
  const baseShadow = "0 6px 18px var(--shadow-color)"; // subtle base shadow
  const hoverSubtleShadow = "0 12px 24px var(--shadow-color)"; // hover for non-selected
  const selectedRing = "0 0 0 6px var(--primary-color)"; // ring color for selected
  const selectedHoverRing = "0 0 0 8px var(--primary-color)"; // stronger on hover

  return (
    <motion.div
      ref={ref}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      aria-pressed={onClick ? selected : undefined}
      aria-label={ariaLabel ?? alt}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`rounded-full flex items-center justify-center overflow-hidden ${interactive} ${className}`}
      style={{
        width: px,
        height: px,
        background: "var(--bg-light-color)",
        willChange: "transform, box-shadow",
        ...style,
      }}
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: selected ? 1.04 : 1,
        // default boxShadow: if selected show selectedRing + base shadow, otherwise subtle base shadow without ring
        boxShadow: selected
          ? `${selectedRing}, 0 14px 34px var(--shadow-color)`
          : baseShadow,
      }}
      whileHover={
        onClick
          ? selected
            ? {
                y: -6,
                scale: 1.08,
                boxShadow: `${selectedHoverRing}, 0 20px 40px var(--shadow-color)`,
              }
            : {
                y: -6,
                scale: 1.04,
                boxShadow: `${hoverSubtleShadow}, 0 14px 34px var(--shadow-color)`,
              }
          : {}
      }
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
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
        children
      ) : (
        <MusicalNoteIcon
          className="h-8 w-8 text-[var(--primary-color)]"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
});

export default CardCircle;
