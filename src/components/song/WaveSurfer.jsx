import React, { useEffect, useRef, useMemo } from "react";

/**
 * MockWaveform
 * - progress: 0..1
 * - isPlaying: boolean
 * - peaksCount: number of bars
 * - height default 48
 */
export default function WaveSurfer({
  progress = 0,
  isPlaying = false,
  peaksCount = 120,
  height = 48,
  className = "",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const peaks = useMemo(() => {
    return Array.from({ length: peaksCount }).map(() => {
      const r = Math.pow(Math.random(), 1.6);
      return Math.max(0.02, Math.min(1, r + (Math.random() - 0.5) * 0.12));
    });
  }, [peaksCount]);

  const draw = (time = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const gap = Math.max(2 * dpr, Math.floor((w / peaks.length) * 0.18));
    const barW = Math.max(
      1 * dpr,
      Math.floor((w - gap * (peaks.length - 1)) / peaks.length)
    );
    const totalW = peaks.length * barW + gap * (peaks.length - 1);
    const offsetX = Math.max(0, (w - totalW) / 2);

    // background bars
    for (let i = 0; i < peaks.length; i++) {
      const p = peaks[i];
      const anim = isPlaying ? 0.06 * Math.sin(time / 300 + i) : 0;
      const amp = Math.max(0, Math.min(1, p + anim));
      const bh = Math.max(2 * dpr, Math.floor(amp * h));
      const x = offsetX + i * (barW + gap);
      const y = (h - bh) / 2;
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      roundRect(ctx, x, y, barW, bh, barW * 0.15);
      ctx.fill();
    }

    // progress overlay
    const progressPx = Math.max(0, Math.min(1, progress)) * totalW;
    if (progressPx > 0) {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(99,102,241,0.95)"); // indigo
      grad.addColorStop(1, "rgba(236,72,153,0.95)"); // pink
      ctx.save();
      ctx.beginPath();
      ctx.rect(offsetX, 0, progressPx, h);
      ctx.clip();

      for (let i = 0; i < peaks.length; i++) {
        const p = peaks[i];
        const anim = isPlaying ? 0.06 * Math.sin(time / 300 + i) : 0;
        const amp = Math.max(0, Math.min(1, p + anim));
        const bh = Math.max(2 * dpr, Math.floor(amp * h));
        const x = offsetX + i * (barW + gap);
        const y = (h - bh) / 2;
        ctx.fillStyle = "rgba(255,255,255,1)";
        roundRect(ctx, x, y, barW, bh, barW * 0.15);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = grad;
      ctx.fillRect(offsetX, 0, progressPx, h);
      ctx.restore();
    }

    // playhead dot
    const headX = offsetX + progressPx;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.arc(headX, h / 2, Math.max(1.5 * dpr, 3), 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    const loop = (t) => {
      draw(t);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // progress and isPlaying used inside draw via closure; re-render handled by RAF
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peaks, progress, isPlaying]);

  useEffect(() => {
    const resize = () => draw(performance.now());
    const ro = new ResizeObserver(resize);
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: 8,
          cursor: "pointer",
        }}
        aria-hidden
      />
    </div>
  );

  // helper
  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
