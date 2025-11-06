import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import banner from "../../assets/img/banner/totoro025.jpg";

export default function Banner() {
  // generate fireflies once
  const fireflies = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        size: 2 + Math.random() * 8,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 4,
        color:
          Math.random() > 0.85
            ? "hsla(190,90%,65%,0.95)"
            : "hsla(48,100%,70%,0.95)",
      })),
    []
  );

  // cycle between day and night
  const DAY_MS = 3000;
  const NIGHT_MS = 3000;
  const TRANSITION_MS = 1000;
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timeoutId = null;

    const schedule = () => {
      // start with day for DAY_MS, then transition to night, stay NIGHT_MS, back to day...
      timeoutId = setTimeout(() => {
        if (!mounted) return;
        setIsNight(true);
        timeoutId = setTimeout(() => {
          if (!mounted) return;
          setIsNight(false);
          schedule(); // loop
        }, NIGHT_MS + TRANSITION_MS);
      }, DAY_MS);
    };

    schedule();
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const overlayTransition = {
    duration: TRANSITION_MS / 1000,
    ease: "easeInOut",
  };

  return (
    <div className="relative w-2/3 h-[300px] overflow-hidden rounded-2xl shadow-lg mx-auto mt-6">
      {/* Background image */}
      <img
        src={banner}
        alt="Forest"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Day overlay (subtle) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isNight ? 0 : 1 }}
        transition={overlayTransition}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(6,30,45,0.02) 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Night overlay (subtle, will fade in/out) */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0f2c]/70 via-[#0a1a3a]/80 to-[#000]/90 backdrop-blur-[1px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isNight ? 1 : 0 }}
        transition={overlayTransition}
      />

      {/* Fireflies */}
      {fireflies.map((f, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_6px_2px_rgba(255,255,150,0.6)]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * 400,
            opacity: 0.2 + Math.random() * 0.8,
            scale: 0.8 + Math.random() * 0.6,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * 400],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pointer-events-none">
        <h1 className="font-italianno text-5xl mb-2 drop-shadow-lg">
          Music Player
        </h1>
        <p className="font-nunito text-lg opacity-90">
          Hãy tận hưởng những giai điệu tuyệt vời từ thế giới hoạt hình!
        </p>
      </div>
    </div>
  );
}
