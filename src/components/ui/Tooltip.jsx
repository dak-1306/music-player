import React, { useRef, useState, useEffect, cloneElement } from "react";
import { createPortal } from "react-dom";

/**
 * Tooltip component
 * Props:
 *  - content: node | string (required) -> tooltip content
 *  - children: element to attach tooltip to (required)
 *  - placement: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
 *  - openOnClick: boolean (default: false) -> click to toggle instead of hover
 *  - delayShow: ms before show (default: 120)
 *  - delayHide: ms before hide (default: 100)
 *  - withArrow: boolean (default: true)
 *  - offset: px offset between target and tooltip (default: 8)
 *  - className: extra classes for tooltip
 *  - id: optional id for aria-describedby
 *
 * Accessibility:
 *  - role="tooltip"
 *  - adds aria-describedby to the child
 *  - supports keyboard ESC to close
 */
let tooltipIdCounter = 0;

export default function Tooltip({
  content,
  children,
  placement = "top",
  openOnClick = false,
  delayShow = 120,
  delayHide = 100,
  withArrow = true,
  offset = 8,
  className = "",
  id,
}) {
  const targetRef = useRef(null);
  const tipRef = useRef(null);
  const arrowRef = useRef(null);
  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({ left: 0, top: 0, transform: "translate(0,0)" });
  const [arrowStyle, setArrowStyle] = useState({});
  const tooltipId = id || `tooltip-${++tooltipIdCounter}`;

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        clearTimers();
        setVisible(false);
      }
    }
    if (visible) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  useEffect(() => {
    if (visible) computePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, content, placement, offset]);

  function clearTimers() {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }

  function showNow() {
    clearTimers();
    showTimer.current = setTimeout(() => {
      setVisible(true);
      showTimer.current = null;
    }, delayShow);
  }

  function hideNow() {
    clearTimers();
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      hideTimer.current = null;
    }, delayHide);
  }

  function handleToggleClick(e) {
    e.stopPropagation();
    if (!openOnClick) return;
    clearTimers();
    setVisible((v) => !v);
  }

  function handleMouseEnter() {
    if (openOnClick) return;
    showNow();
  }
  function handleMouseLeave() {
    if (openOnClick) return;
    hideNow();
  }
  function handleFocus() {
    showNow();
  }
  function handleBlur() {
    hideNow();
  }

  function computePosition() {
    const target = targetRef.current;
    const tip = tipRef.current;
    if (!target || !tip) return;

    const tRect = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    let top = 0;
    let left = 0;
    let arrowPos = {};

    const place = placement;

    // Basic placement calculation
    if (place === "top") {
      top = tRect.top + scrollY - tipRect.height - offset;
      left = tRect.left + scrollX + tRect.width / 2 - tipRect.width / 2;
      arrowPos = { left: Math.max(8, tipRect.width / 2 - 6) }; // arrow centered
    } else if (place === "bottom") {
      top = tRect.bottom + scrollY + offset;
      left = tRect.left + scrollX + tRect.width / 2 - tipRect.width / 2;
      arrowPos = { left: Math.max(8, tipRect.width / 2 - 6) };
    } else if (place === "left") {
      top = tRect.top + scrollY + tRect.height / 2 - tipRect.height / 2;
      left = tRect.left + scrollX - tipRect.width - offset;
      arrowPos = { top: Math.max(8, tipRect.height / 2 - 6) };
    } else if (place === "right") {
      top = tRect.top + scrollY + tRect.height / 2 - tipRect.height / 2;
      left = tRect.right + scrollX + offset;
      arrowPos = { top: Math.max(8, tipRect.height / 2 - 6) };
    }

    // prevent overflow horizontally
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const margin = 8;
    if (left < margin) left = margin;
    if (left + tipRect.width > viewportWidth - margin) left = viewportWidth - margin - tipRect.width;
    if (top < margin) top = margin;
    if (top + tipRect.height > viewportHeight - margin + scrollY) top = Math.max(margin, viewportHeight - margin - tipRect.height + scrollY);

    setStyle({
      left: Math.round(left),
      top: Math.round(top),
      transform: "translate(0,0)",
    });
    setArrowStyle(arrowPos);
  }

  // attach handlers to child safely (merge existing handlers)
  const child = React.Children.only(children);
  const childProps = child.props || {};

  const composed = {
    ref: (node) => {
      targetRef.current = node;
      const { ref } = child;
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") ref.current = node;
    },
    onMouseEnter: (e) => {
      childProps.onMouseEnter && childProps.onMouseEnter(e);
      handleMouseEnter();
    },
    onMouseLeave: (e) => {
      childProps.onMouseLeave && childProps.onMouseLeave(e);
      handleMouseLeave();
    },
    onFocus: (e) => {
      childProps.onFocus && childProps.onFocus(e);
      handleFocus();
    },
    onBlur: (e) => {
      childProps.onBlur && childProps.onBlur(e);
      handleBlur();
    },
    onClick: (e) => {
      childProps.onClick && childProps.onClick(e);
      handleToggleClick(e);
    },
    "aria-describedby": visible ? tooltipId : undefined,
    tabIndex: childProps.tabIndex ?? 0,
  };

  // Render tooltip content inside a portal
  const tooltipNode = visible ? (
    createPortal(
      <div
        ref={tipRef}
        id={tooltipId}
        role="tooltip"
        className={`z-50 pointer-events-none ${className}`.trim()}
        style={{
          position: "absolute",
          left: style.left,
          top: style.top,
          // minimal visual defaults, can be overridden with className
          background: "rgba(15, 23, 42, 0.95)",
          color: "white",
          padding: "6px 10px",
          borderRadius: 6,
          fontSize: 13,
          lineHeight: "1",
          maxWidth: 320,
          boxShadow: "0 6px 18px rgba(2,6,23,0.3)",
          ...style,
        }}
      >
        <div style={{ pointerEvents: "auto" }}>{content}</div>
        {withArrow && (
          <div
            ref={arrowRef}
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              background: "rgba(15, 23, 42, 0.95)",
              transform: "rotate(45deg)",
              boxShadow: "inherit",
              ...(
                placement === "top" ? { bottom: -6, left: arrowStyle.left } :
                placement === "bottom" ? { top: -6, left: arrowStyle.left } :
                placement === "left" ? { right: -6, top: arrowStyle.top } :
                { left: -6, top: arrowStyle.top }
              ),
            }}
          />
        )}
      </div>,
      document.body
    )
  ) : null;

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If child is a plain element, clone with props; otherwise wrap
  const wrappedChild = React.isValidElement(child)
    ? cloneElement(child, composed)
    : (
      <span {...composed} style={{ display: "inline-block" }}>
        {child}
      </span>
    );

  return (
    <>
      {wrappedChild}
      {tooltipNode}
    </>
  );
}