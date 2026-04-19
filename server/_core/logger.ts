export type LogLevel = "info" | "warn" | "error";

function format(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  return JSON.stringify({
    ts: new Date().toISOString(),
    level,
    message,
    ...(meta ? { meta } : {}),
  });
}

export const serverLogger = {
  info(message: string, meta?: Record<string, unknown>) {
    console.log(format("info", message, meta));
  },
  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(format("warn", message, meta));
  },
  error(message: string, meta?: Record<string, unknown>) {
    console.error(format("error", message, meta));
  },
};
