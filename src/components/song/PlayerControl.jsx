import React from "react";
import Button from "../ui/Button.jsx";
import {
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";

/**
 * PlayerControl - clean, small control bar
 *
 * Props:
 * - song: { title, artist, ... } (optional, used for display)
 * - isPlaying: boolean
 * - onPlayPause: () => void
 * - onNext: () => void
 * - onPrev: () => void
 * - onToggleLike: () => void
 * - isLiked: boolean
 * - disabled: boolean
 *
 * Designed to be easy to wire with zustand store (pass handlers from store).
 */
export default function PlayerControl({
  song,
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrev,
  onToggleLike,
  isLiked = false,
  disabled = false,
  setCloseSongCard,
}) {
  return (
    <div className="flex items-center gap-6 w-full max-w-4xl mx-auto px-4 py-3">
      {/* Prev */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onPrev}
        disabled={disabled}
        ariaLabel="Previous"
        className="p-2"
      >
        <ChevronLeftIcon className="w-5 h-5 text-[var(--text-muted-color)]" />
      </Button>

      {/* Play / Pause (prominent) */}
      <Button
        size="md"
        variant="primary"
        onClick={onPlayPause}
        disabled={disabled}
        ariaLabel={isPlaying ? "Pause" : "Play"}
        className="flex items-center justify-center w-12 h-12 p-0 rounded-full"
      >
        {isPlaying ? (
          <PauseIcon className="w-5 h-5" />
        ) : (
          <PlayIcon className="w-5 h-5 ml-[2px]" />
        )}
      </Button>

      {/* Next */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onNext}
        disabled={disabled}
        ariaLabel="Next"
        className="p-2"
      >
        <ChevronRightIcon className="w-5 h-5 text-[var(--text-muted-color)]" />
      </Button>

      {/* Song info */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[var(--text-title-color)] mb-1">
          {song?.title ?? "No track selected"}
        </h3>
        <p className="text-lg text-[var(--text-secondary-color)]">
          {song?.artist ?? "—"}
        </p>
      </div>

      {/* Favorite */}
      <Button
        size="sm"
        variant={isLiked ? "secondary" : "outline"}
        onClick={onToggleLike}
        disabled={disabled}
        ariaLabel={isLiked ? "Unfavorite" : "Add to favorites"}
        className="p-2"
      >
        <HeartIcon
          className={`w-5 h-5 ${
            isLiked ? "text-white" : "text-[var(--text-muted-color)]"
          }`}
        />
      </Button>

      <Button
        onClick={setCloseSongCard}
        size="md"
        type="button"
        variant="secondary"
      >
        <ArrowLeftIcon className="w-5 h-5 inline-block" />
      </Button>
    </div>
  );
}
