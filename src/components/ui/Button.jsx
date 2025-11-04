import { useState } from "react";

export default function Button({
  children,
  variant = "primary", // primary | secondary | ghost | danger | outline
  size = "md", // sm | md | lg
  leftIcon = null,
  rightIcon = null,
  loading = false,
  disabled = false,
  type = "button",
  ariaLabel,
  className = "",
  onClick,
  ...rest
}) {
  const [hover, setHover] = useState(false);

  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md cursor-pointer transition-shadow transition-colors transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const variants = {
    primary: `text-white shadow-sm`,
    secondary: `text-white shadow-sm`,
    outline: `bg-transparent border border-[rgba(0,0,0,0.08)]`,
    ghost: `bg-transparent`,
    danger: `text-white shadow-sm`,
  };

  // base visual styles (using CSS variables)
  const variantStyle = {
    primary: {
      backgroundColor: "var(--primary-color)",
      boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      color: "white",
    },
    secondary: {
      background:
        "linear-gradient(90deg, rgba(42,211,65,1) 0%, rgba(155,225,93,1) 100%)",
      boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      color: "white",
    },
    danger: {
      background: "#dc2626",
      boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      color: "white",
    },
    outline: {
      borderColor: "var(--green-dark-color, #1b4332)",
      color: "var(--green-dark-color, #1b4332)",
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--text-dark-color)",
      boxShadow: "none",
    },
  };

  // hover styles per variant
  const variantHoverStyle = {
    primary: {
      transform: "translateY(-2px) scale(1.01)",
      boxShadow: "0 8px 20px [var(--primary-color-shadow]",
      filter: "brightness(0.95)",
    },
    secondary: {
      transform: "translateY(-2px) scale(1.01)",
      boxShadow: "0 8px 20px rgba(42, 211, 65, 0.18)",
      filter: "brightness(0.96)",
    },
    danger: {
      transform: "translateY(-2px) scale(1.01)",
      boxShadow: "0 8px 20px rgba(220, 38, 38, 0.18)",
      filter: "brightness(0.95)",
    },
    outline: {
      backgroundColor: "rgba(27, 67, 50, 0.04)",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
    },
    ghost: {
      backgroundColor: "rgba(0,0,0,0.03)",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.04)",
    },
  };

  const combinedStyle = {
    ...(variantStyle[variant] || {}),
    ...(disabled || loading
      ? {}
      : hover
      ? variantHoverStyle[variant] || {}
      : {}),
  };

  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${
        variants[variant] || ""
      } ${className}`}
      style={combinedStyle}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading ? "true" : undefined}
      onMouseEnter={() => !disabled && !loading && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => !disabled && !loading && setHover(true)}
      onBlur={() => setHover(false)}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}

      <span className="flex items-center justify-center">{children}</span>

      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
