import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  NightSky.jsx
  - Component overlay bầu trời/đêm dùng chung cho:
    + mode="music": hiệu ứng khi đang phát nhạc (nhiều sao, comets)
    + mode="login": làm background đăng nhập (có thể immediate để tránh flash)
  - Props chính:
    visible: có hiển thị overlay không
    blockInteraction: nếu true thì overlay chắn tương tác (pointer-events)
    mode: "music" | "login" (chỉ để tuỳ biến, hiện logic dùng chung)
    immediate: nếu true thì skip fade-in (dùng cho login để tránh nhìn thấy nền sáng->tối)
    starCount: số ngôi sao
    showComets: bật/tắt sao chổi
    cometInterval: khoảng thời gian spawn sao chổi (ms)
*/

export default function NightSky({
  visible = false,
  blockInteraction = true,
  mode = "music", // "music" | "login"
  immediate = false, // nếu true sẽ bỏ animation khởi tạo
  starCount = 30,
  showComets = true,
  cometInterval = 2000,
  className = "",
}) {
  // comets: mảng các sao chổi đang hiển thị (mỗi comet có id/top/delay)
  const [comets, setComets] = useState([]);
  // showChildren: điều khiển render stars + comets sau fade-in (tránh flash)
  const [showChildren, setShowChildren] = useState(false);

  // Effect: tạo sao chổi theo interval khi visible && showComets
  useEffect(() => {
    if (!visible || !showComets) return;
    const id = setInterval(() => {
      setComets((s) => [
        ...s,
        {
          id: Date.now() + Math.random(),
          top: `${10 + Math.random() * 70}%`, // vị trí theo trục Y
          delay: Math.random() * 0.6, // delay cho animation
        },
      ]);
    }, cometInterval);
    return () => clearInterval(id);
  }, [visible, showComets, cometInterval]);

  // Effect: quyết định showChildren ngay lập tức nếu immediate === true,
  // hoặc tắt children khi overlay bị ẩn
  useEffect(() => {
    if (!visible) {
      setShowChildren(false);
      return;
    }
    if (immediate) {
      // hiển thị ngay (không chờ fade-in) — phù hợp cho background login
      setShowChildren(true);
    }
    // nếu không immediate, showChildren sẽ bật trong onAnimationComplete của motion.div
  }, [visible, immediate]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // Nếu immediate=true thì không animate initial (tránh flash)
          initial={immediate ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: immediate ? 0 : 0.45 }}
          style={{
            zIndex: 40,
            pointerEvents: blockInteraction ? "auto" : "none",
          }}
          // lớp nền gradient + blur để tạo cảm giác bầu trời đêm
          className={`fixed inset-0 bg-gradient-to-b from-[#050517] via-[#0b0520] to-[#03020a] backdrop-blur-sm overflow-hidden ${className}`}
          onAnimationComplete={() => {
            // bật render stars/comets sau khi fade-in hoàn tất (nếu không immediate)
            if (!immediate) setShowChildren(true);
          }}
        >
          {/* Stars / background */}
          {showChildren && (
            <div className="absolute inset-0" aria-hidden>
              {Array.from({ length: starCount }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    // mỗi ngôi sao có kích thước, vị trí và độ mờ ngẫu nhiên
                    width: `${1 + Math.random() * 2}px`,
                    height: `${1 + Math.random() * 2}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    background: "white",
                    opacity: 0.6 + Math.random() * 0.25,
                    // animation CSS "twinkle" expected ở global styles
                    animation: `twinkle ${3 + Math.random() * 4}s ${
                      Math.random() * 2
                    }s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Comets (sao chổi) */}
          {showChildren &&
            showComets &&
            comets.map((c) => (
              <motion.div
                key={c.id}
                // di chuyển từ trái sang phải, mờ -> sáng -> mờ
                initial={{ x: "-20vw", opacity: 0 }}
                animate={{ x: "120vw", opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.6,
                  delay: c.delay,
                  ease: "easeOut",
                }}
                // sau khi animation xong thì loại comet khỏi state để không văng memory
                onAnimationComplete={() =>
                  setComets((prev) => prev.filter((p) => p.id !== c.id))
                }
                className="absolute"
                style={{ top: c.top, zIndex: 42 }}
              >
                <div
                  className="h-0.5 rounded-sm"
                  style={{
                    width: 112, // độ dài vệt sao chổi
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.1))",
                    opacity: 0.9,
                  }}
                />
              </motion.div>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
