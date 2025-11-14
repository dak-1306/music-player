import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import Tooltip from "./Tooltip.jsx";
import { EyeIcon, EyeSlashIcon, HomeIcon } from "@heroicons/react/24/outline";

/**
 * AuthFormUI - presentational component for Login / Register
 *
 * Props (all optional):
 * - mode: "login" | "register" (default "login")
 * - onSubmit: (formData) => void         // called when user submits
 * - onModeChange: (mode) => void         // called when user toggles mode
 * - initial?: { name, email, password }  // initial values (optional)
 * - loading: boolean
 * - className: string
 *
 * Notes:
 * - UI-only: no validation/side effects here. Keep simple so you can plug logic elsewhere.
 */
export default function AuthFormUI({
  mode: controlledMode,
  onSubmit,
  onModeChange,
  initial = {},
  loading = false,
  className = "",
}) {
  const [mode, setMode] = useState(controlledMode ?? "login");
  useEffect(() => {
    if (controlledMode) setMode(controlledMode);
  }, [controlledMode]);

  const navigate = useNavigate();

  const [name, setName] = useState(initial.name || "");
  const [email, setEmail] = useState(initial.email || "");
  const [password, setPassword] = useState(initial.password || "");
  const [confirm, setConfirm] = useState(initial.confirm || "");
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    setName(initial.name || "");
    setEmail(initial.email || "");
    setPassword(initial.password || "");
    setConfirm(initial.confirm || "");
  }, [initial]);

  function handleModeToggle() {
    const next = mode === "login" ? "register" : "login";
    // notify parent if provided
    if (onModeChange) onModeChange(next);
    // navigate to the corresponding route so URL matches mode
    navigate(next === "login" ? "/login" : "/register");
  }

  function submit(e) {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      password,
      confirm,
    };
    onSubmit?.(payload);
  }

  return (
    <form
      onSubmit={submit}
      className={`max-w-85 w-full bg-[var(--bg-light-color)] rounded-lg p-6 space-y-6 shadow ${className}`}
    >
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-semibold">
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </h2>
        <p className="text-xl text-[var(--text-secondary-color)]">
          {mode === "login"
            ? "Hãy đăng nhập để tiếp tục"
            : "Hãy tạo tài khoản để bắt đầu"}
        </p>
      </header>

      {mode === "register" && (
        <label className="block space-y-1">
          <div className="text-xs text-[var(--text-secondary-color)]">Tên</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            className="w-full px-3 py-2 rounded border bg-white focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            autoComplete="name"
            disabled={loading}
          />
        </label>
      )}

      <label className="block">
        <div className="text-xs text-[var(--text-secondary-color)] mb-1">
          Email
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded border bg-white focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          autoComplete="email"
          disabled={loading}
        />
      </label>

      <label className="block relative">
        <div className="text-xs text-[var(--text-secondary-color)] mb-1">
          Mật khẩu
        </div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPwd ? "text" : "password"}
          placeholder="Mật khẩu"
          className="w-full px-3 py-2 rounded border bg-white focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPwd((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
          aria-label={showPwd ? "Hide password" : "Show password"}
        >
          {showPwd ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </label>

      {mode === "register" && (
        <label className="block mb-4">
          <div className="text-xs text-[var(--text-secondary-color)] mb-1">
            Xác nhận mật khẩu
          </div>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type={showPwd ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            className="w-full px-3 py-2 rounded border bg-white focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            autoComplete="new-password"
            disabled={loading}
          />
        </label>
      )}

      <div className="flex flex-col items-center gap-3">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading
            ? "Đang xử lý..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </Button>

        <button
          type="button"
          onClick={handleModeToggle}
          className="text-sm text-[var(--primary-color)] underline-offset-2 hover:underline"
        >
          {mode === "login"
            ? "Chưa có tài khoản? Đăng ký"
            : "Đã có tài khoản? Đăng nhập"}
        </button>
        <Tooltip content="Về trang chủ" position="bottom">
          <Link
            to="/"
            className="flex items-center text-sm text-[var(--text-secondary-color)] hover:text-[var(--primary-color)]"
          >
            <HomeIcon className="w-4 h-4" />
          </Link>
        </Tooltip>
      </div>
    </form>
  );
}
