import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NightSky({ visible = false, blockInteraction = true }) {
  const [comets, setComets] = useState([]);

  // Tạo sao chổi ngẫu nhiên
  useEffect(() => {
    const id = setInterval(() => {
      setComets((s) => [
        ...s,
        {
          id: Date.now() + Math.random(),
          top: `${10 + Math.random() * 70}%`, // vị trí theo chiều cao
          delay: Math.random() * 0.6, // trễ thời gian bay
        },
      ]);
    }, 2000); // mỗi 2 giây có 1 sao chổi

    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          // fixed full-screen overlay
          style={{
            zIndex: 40,
            pointerEvents: blockInteraction ? "auto" : "none",
          }}
          className="fixed inset-0 bg-gradient-to-b from-[#050517] via-[#0b0520] to-[#03020a] backdrop-blur-sm overflow-hidden"
        >
          {/* Các ngôi sao nhỏ lấp lánh */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-70"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${
                    3 + Math.random() * 4
                  }s infinite ease-in-out`,
                }}
              />
            ))}
          </div>

          {/* Sao chổi bay qua */}
          {comets.map((c) => (
            <motion.div
              key={c.id}
              initial={{ x: "-20vw", opacity: 0 }}
              animate={{ x: "120vw", opacity: [0, 1, 0] }}
              transition={{
                duration: 1.6,
                delay: c.delay,
                ease: "easeOut",
              }}
              onAnimationComplete={() =>
                setComets((prev) => prev.filter((p) => p.id !== c.id))
              }
              className="absolute"
              style={{ top: c.top, zIndex: 42 }}
            >
              <div className="h-0.5 bg-white opacity-80 w-28 rounded-sm" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
