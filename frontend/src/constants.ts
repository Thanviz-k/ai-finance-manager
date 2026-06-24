export const CAT: Record<string, { icon: string; bar: string; bg: string; text: string }> = {
  Food:          { icon: "🍔", bar: "#f97316", bg: "#fff7ed", text: "#9a3412" },
  Rent:          { icon: "🏠", bar: "#6366f1", bg: "#eef2ff", text: "#3730a3" },
  Subscriptions: { icon: "📺", bar: "#ec4899", bg: "#fdf2f8", text: "#9d174d" },
  Transport:     { icon: "🚗", bar: "#14b8a6", bg: "#f0fdfa", text: "#115e59" },
  Shopping:      { icon: "🛍️", bar: "#f59e0b", bg: "#fffbeb", text: "#92400e" },
  Health:        { icon: "💊", bar: "#22c55e", bg: "#f0fdf4", text: "#14532d" },
  Utilities:     { icon: "⚡", bar: "#3b82f6", bg: "#eff6ff", text: "#1e3a8a" },
  Other:         { icon: "📦", bar: "#94a3b8", bg: "#f8fafc", text: "#475569" },
};

export function getCat(key: string) {
  return CAT[key] ?? CAT["Other"];
}