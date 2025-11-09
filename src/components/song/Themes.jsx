import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import CardCircle from "../ui/CardCircle.jsx";
import Tooltip from "../ui/Tooltip.jsx";

/**
 * Themes carousel (page-based)
 * - expects prop `themes` = array of { id, label, img?, color?, icon? }
 * - shows `perPage` items per page (grid)
 * - supports drag (framer-motion), keyboard and dots
 */
export default function Themes({
  themes: propsThemes,
  themesSelected,
  setThemesSelected,
}) {
  const themes = propsThemes || [];

  const perPage = 4;
  const total = themes.length;
  const pages = Math.max(1, Math.ceil(total / perPage));

  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(0);

  // cập nhật kích thước container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () =>
      setContainerW(Math.floor(el.getBoundingClientRect().width));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pagesData = Array.from({ length: pages }, (_, p) =>
    themes.slice(p * perPage, p * perPage + perPage)
  );

  // drag end xử lý: nếu kéo đủ threshold hoặc velocity lớn -> chuyển page
  const handleDragEnd = useCallback(
    (event, info) => {
      const dx = info.offset.x;
      const vx = info.velocity.x;
      const threshold = containerW * 0.15;
      // nếu kéo sang trái (dx < 0) thì tăng page
      if (dx < -threshold || vx < -500)
        setPage((s) => Math.min(pages - 1, s + 1));
      else if (dx > threshold || vx > 500) setPage((s) => Math.max(0, s - 1));
    },
    [containerW, pages]
  );

  // keyboard nav
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
      if (e.key === "ArrowRight") setPage((p) => Math.min(pages - 1, p + 1));
    }
    const node = containerRef.current;
    node?.addEventListener("keydown", onKey);
    return () => node?.removeEventListener("keydown", onKey);
  }, [pages]);

  // translate X target
  const x = -page * containerW;

  // dragConstraints numeric: left = -(pages-1)*containerW, right = 0
  const maxDrag = Math.max(0, (pages - 1) * containerW);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className="mb-2 mt-4 text-[var(--text-title-color)] text-lg text-center">
        Select a theme for the music player:
      </p>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Themes carousel"
      >
        <motion.div
          className="flex"
          style={{ width: pages * containerW }}
          animate={{ x }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {pagesData.map((pageItems, pageIndex) => (
            <div
              key={pageIndex}
              className="page"
              style={{
                width: containerW,
                padding: "24px 12px",
                boxSizing: "border-box",
                display: "grid",
                gridTemplateColumns: `repeat(${perPage}, 1fr)`,
                gap: 16,
                alignItems: "center",
                justifyItems: "center",
              }}
              aria-hidden={pageIndex !== page}
            >
              {pageItems.map((t, i) => {
                const sizeNum = Math.max(
                  72,
                  Math.min(160, Math.floor(containerW / perPage) - 12)
                );
                const globalIndex = pageIndex * perPage + i;

                // chỉ đánh dấu "selected" khi theme này thực sự được chọn (themesSelected)
                const isSelected = themesSelected?.id === t.id;

                return (
                  <div
                    key={t.id ?? `${pageIndex}-${i}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip content={t.label} placement="top">
                      <CardCircle
                        size={sizeNum}
                        selected={isSelected} // <-- sửa ở đây
                        onClick={() => {
                          const targetPage = Math.floor(globalIndex / perPage);
                          if (targetPage !== page) setPage(targetPage);

                          // toggle selection: click lại sẽ bỏ chọn
                          if (setThemesSelected) {
                            if (themesSelected?.id === t.id)
                              setThemesSelected(null);
                            else setThemesSelected(t);
                          }
                        }}
                        ariaLabel={t.label}
                        image={t.img}
                        alt={t.label}
                        style={t.color ? { background: t.color } : undefined}
                      >
                        {!t.img && t.icon ? t.icon : null}
                      </CardCircle>
                    </Tooltip>
                  </div>
                );
              })}

              {/* keep grid consistent on last page */}
              {pageItems.length < perPage &&
                Array.from({ length: perPage - pageItems.length }).map(
                  (_, k) => <div key={`empty-${k}`} />
                )}
            </div>
          ))}
        </motion.div>

        {/* dots */}
        <div className="flex items-center justify-center gap-3 mt-4 pb-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to page ${i + 1}`}
              onClick={() => setPage(i)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                i === page
                  ? "bg-[var(--primary-color)]"
                  : "bg-[rgba(0,0,0,0.12)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
