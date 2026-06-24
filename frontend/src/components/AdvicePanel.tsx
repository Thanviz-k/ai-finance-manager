interface Props {
  advice: string;
  provider: "openai" | "gemini";
}

export default function AdvicePanel({ advice, provider }: Props) {
  const badge =
    provider === "gemini"
      ? { label: "Gemini", color: "#8b5cf6", bg: "#f5f3ff" }
      : { label: "OpenAI", color: "#10a37f", bg: "#f0fdf9" };

  return (
    <div style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      padding: "1.5rem",
      marginBottom: 20,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>🤖 AI Coach Says</h2>
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: badge.color,
          background: badge.bg,
          border: `1px solid ${badge.color}44`,
          padding: "3px 10px",
          borderRadius: 999,
        }}>
          {badge.label}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {advice.split("\n").filter(Boolean).map((line, i) => (
          <p key={i} style={{ fontSize: 14, color: "#334155", lineHeight: 1.75 }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}