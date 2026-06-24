import { getCat } from "../constants";

interface Props {
  breakdown: Record<string, number>;
  total: number;
}

export default function SpendingBreakdown({ breakdown, total }: Props) {
  const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] ?? 1;

  return (
    <div style={{ marginBottom: 24 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Spending Breakdown</h2>
        <span style={{ fontSize: 13, color: "#64748b" }}>
          Total:{" "}
          <strong style={{ color: "#0f172a" }}>
            ₹{total.toLocaleString("en-IN")}
          </strong>
        </span>
      </div>

      {/* Top category cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 10,
        marginBottom: 24,
      }}>
        {sorted.slice(0, 4).map(([cat, amt]) => {
          const c = getCat(cat);
          return (
            <div key={cat} style={{
              background: c.bg,
              border: `1px solid ${c.bar}33`,
              borderRadius: 12,
              padding: "14px 12px",
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.text, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
                {cat}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>
                ₹{Math.round(amt).toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                {((amt / total) * 100).toFixed(1)}% of total
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sorted.map(([cat, amt]) => {
          const c = getCat(cat);
          const pct = (amt / max) * 100;
          return (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 120, fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <span>{c.icon}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat}</span>
              </div>
              <div style={{ flex: 1, height: 10, background: "#f1f5f9", borderRadius: 999, overflow: "hidden" }}>
                <div style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: c.bar,
                  borderRadius: 999,
                  transition: "width 0.9s cubic-bezier(0.34,1.56,0.64,1)",
                }} />
              </div>
              <div style={{ width: 120, fontSize: 12, color: "#64748b", textAlign: "right", flexShrink: 0 }}>
                ₹{Math.round(amt).toLocaleString("en-IN")}{" "}
                <span style={{ color: "#cbd5e1" }}>({((amt / total) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}