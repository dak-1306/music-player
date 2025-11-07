import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import {
  extractYouTubeId,
  createYouTubeEmbedUrl,
} from "../../utils/youtubeUtils.js";
import WaveSurfer from "./WaveSurfer.jsx";

export default function SongCard({ song, isPlaying = false, onTogglePlay }) {
  const [playerReady, setPlayerReady] = useState(false);
  const [usingIframe, setUsingIframe] = useState(false);

  // simulated progress 0..1 for the mock waveform
  const [simProgress, setSimProgress] = useState(0);
  const progRef = useRef(simProgress);

  // simple simulator: advance progress while playing, loop when reaches end
  useEffect(() => {
    progRef.current = simProgress;
  }, [simProgress]);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (isPlaying) {
        const speed = 0.02; // progress per second (tweak for visual)
        const next = Math.min(1, progRef.current + speed * dt);
        progRef.current = next;
        setSimProgress(next);
        if (next >= 1) {
          // loop for demo
          progRef.current = 0;
          setSimProgress(0);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  if (!song) return null;

  const { title, cover, url, videoId, provider } = song;

  // Lấy videoId từ nhiều nguồn khác nhau
  const finalVideoId = videoId || extractYouTubeId(url);
  const embedUrl = finalVideoId
    ? createYouTubeEmbedUrl(finalVideoId, {
        autoplay: isPlaying ? 1 : 0,
      })
    : null;

  // Debug log để kiểm tra
  console.log("Song data:", { title, provider, videoId, url, finalVideoId });

  return (
    // giới hạn chiều rộng để không chiếm toàn bộ viewport khi ở overlay
    <div className="flex items-center gap-6 p-6 w-auto max-w-4xl mx-auto mt-6">
      {/* Spinning Disc */}
      <div className="relative flex-shrink-0">
        <motion.div
          // giảm 1 chút so với w-60 để cân bằng với khung video mở rộng
          className="relative w-60 h-60 rounded-full overflow-hidden shadow-lg"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
          style={{
            background: `conic-gradient(from 0deg, #1a1a1a, #404040, #1a1a1a)`,
          }}
        >
          {/* Disc Image */}
          <img
            src={cover || "/default-disc.jpg"}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              clipPath: "circle(42% at center)",
            }}
          />

          {/* Center Hole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-2 border-gray-800" />
        </motion.div>

        {/* Play/Pause Button */}
        <button
          onClick={() => onTogglePlay?.(!isPlaying)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Video Player Section */}
      <div className="flex-1 w-96">
        <div className="w-full aspect-video bg-[var(--bg-dark-color)] rounded-lg overflow-hidden shadow-color shadow-md">
          {finalVideoId ? (
            // Iframe YouTube với URL được tối ưu
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
              onLoad={() => {
                console.log("YouTube iframe loaded");
                setPlayerReady(true);
                setUsingIframe(true);
              }}
            />
          ) : url ? (
            // Fallback ReactPlayer nếu chỉ có URL
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              onReady={() => setPlayerReady(true)}
              onPlay={() => onTogglePlay?.(true)}
              onPause={() => onTogglePlay?.(false)}
              onError={(error) => console.error("ReactPlayer error:", error)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-2">Không có video</p>
                <p className="text-sm">
                  Vui lòng kiểm tra videoId: {videoId || "không có"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-4 p-2 bg-[var(--bg-light-color)] rounded-lg shadow-md shadow-color">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {isPlaying
                ? "🎵 Đang phát..."
                : playerReady
                ? "⏸️ Sẵn sàng"
                : "⏳ Đang tải..."}
            </span>
            <div className="text-sm text-[var(--text-secondary-color)]">
              {title}
            </div>
          </div>

          {/* Mock waveform */}
          <WaveSurfer
            progress={simProgress}
            isPlaying={isPlaying}
            height={56}
          />
        </div>
      </div>
    </div>
  );
}
