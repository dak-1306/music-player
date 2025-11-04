import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import CardCircle from "../ui/CardCircle.jsx";
import {
  SunIcon,
  MoonIcon,
  MusicalNoteIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function Themes() {
  const themes = [
    // examples: you can replace icon with image: image: '/path/to/img.jpg'
    {
      id: 0,
      label: "Sunny",
      color: "linear-gradient(135deg,#FFD97A,#FFB86B)",
      icon: <SunIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 1,
      label: "Night",
      color: "linear-gradient(135deg,#89A7FF,#5D6BFF)",
      icon: <MoonIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 2,
      label: "Studio",
      color: "linear-gradient(135deg,#2ad341,#18a558)",
      icon: <MusicalNoteIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 3,
      label: "Magic",
      color: "linear-gradient(135deg,#9BE15D,#00C9FF)",
      icon: <SparklesIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 4,
      label: "Warm",
      color: "linear-gradient(135deg,#FF8DAA,#FFB3A7)",
      icon: <HeartIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 5,
      label: "Calm",
      color: "linear-gradient(135deg,#9AE6B4,#60A5FA)",
      icon: <MusicalNoteIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 6,
      label: "Dream",
      color: "linear-gradient(135deg,#FBCFE8,#C4B5FD)",
      icon: <SparklesIcon className="h-10 w-10 text-white" />,
    },
    {
      id: 7,
      label: "Soft",
      color: "linear-gradient(135deg,#FFD7E2,#FFF5BA)",
      icon: <HeartIcon className="h-10 w-10 text-white" />,
    },
  ];

  const perPage = 4;
  const total = themes.length;
  const pages = Math.ceil(total / perPage);

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
      <p className="mb-4 text-[var(--text-title-color)] text-lg text-center">
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
              {pageItems.map((t) => {
                const sizeNum = Math.max(
                  72,
                  Math.min(160, Math.floor(containerW / perPage) - 12)
                );
                return (
                  <div
                    key={t.id}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CardCircle
                      size={sizeNum}
                      selected={Math.floor(t.id / perPage) === page}
                      onClick={() => {
                        const targetPage = Math.floor(t.id / perPage);
                        if (targetPage !== page) setPage(targetPage);
                      }}
                      ariaLabel={t.label}
                      style={{ background: t.color }}
                    >
                      {/* If you have real images use: <img src={t.image} alt={t.label} style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
                      {t.icon}
                    </CardCircle>
                  </div>
                );
              })}
              {/* fill empty slots so grid stays consistent */}
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
