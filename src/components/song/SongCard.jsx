import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function SongCard({ song, isPlaying = false, onTogglePlay }) {
  const [playerReady, setPlayerReady] = useState(false);

  if (!song) return null;

  const { title, artist, cover, url, videoId, provider } = song;

  // YouTube URL từ videoId hoặc dùng url trực tiếp
  let videoUrl = url;
  if (provider === "youtube") {
    if (videoId) {
      videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    } else if (url && url.includes("youtu.be/")) {
      // Convert youtu.be to youtube.com format
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      if (id) videoUrl = `https://www.youtube.com/watch?v=${id}`;
    }
  }

  // Debug log để kiểm tra URL
  console.log("Song data:", { title, provider, videoId, url });
  console.log("Final videoUrl:", videoUrl);

  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto mt-6">
      {/* Spinning Disc */}
      <div className="relative flex-shrink-0">
        <motion.div
          className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg"
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
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[var(--text-title-color)] mb-1">
            {title}
          </h3>
          <p className="text-lg text-[var(--text-secondary-color)]">{artist}</p>
        </div>

        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-md">
          {videoUrl && ReactPlayer.canPlay(videoUrl) ? (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              onReady={() => {
                console.log("ReactPlayer ready");
                setPlayerReady(true);
              }}
              onPlay={() => {
                console.log("Video playing");
                onTogglePlay?.(true);
              }}
              onPause={() => {
                console.log("Video paused");
                onTogglePlay?.(false);
              }}
              onError={(error) => {
                console.error("ReactPlayer error:", error);
              }}
              onBufferEnd={() => {
                console.log("Buffer ended");
              }}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    controls: 1,
                    modestbranding: 1,
                  },
                },
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-2">Video không khả dụng</p>
                <p className="text-sm">URL: {videoUrl || "Không có URL"}</p>
                <p className="text-xs mt-2">
                  Can play:{" "}
                  {videoUrl
                    ? ReactPlayer.canPlay(videoUrl).toString()
                    : "false"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {playerReady ? "🎵 Sẵn sàng phát" : "⏳ Đang tải..."}
          </span>
          <button
            onClick={() => onTogglePlay?.(false)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Dừng phát
          </button>
        </div>
      </div>
    </div>
  );
}
