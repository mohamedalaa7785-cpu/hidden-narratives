export type ClientLogLevel = "info" | "warn" | "error";

function push(level: ClientLogLevel, message: string, meta?: Record<string, unknown>) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    meta,
    path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  if (level === "error") console.error(payload);
  else if (level === "warn") console.warn(payload);
  else console.info(payload);
}

export const clientLogger = {
  info: (message: string, meta?: Record<string, unknown>) => push("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => push("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => push("error", message, meta),
};
