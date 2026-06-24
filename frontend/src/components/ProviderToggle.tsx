interface Props {
  value: "openai";
  onChange: (v: "openai") => void;
}

export default function ProviderToggle({ value, onChange }: Props) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 18,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      background: "#f8fafc",
    }}>
      <div style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#10a37f",
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>OpenAI Coach</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>Smart budgeting insights with your API key</div>
      </div>
      <button
        onClick={() => onChange("openai")}
        style={{
          border: "none",
          borderRadius: 999,
          background: value === "openai" ? "#10a37f" : "#e2e8f0",
          color: value === "openai" ? "white" : "#64748b",
          padding: "6px 12px",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Active
      </button>
    </div>
  );
}