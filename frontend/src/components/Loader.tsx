import { useState, useEffect } from "react";

const STEPS = [
  "Reading your PDF...",
  "Categorizing transactions...",
  "Getting AI insights...",
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
      {/* Spinner */}
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        border: "3px solid #e2e8f0",
        borderTop: "3px solid #6366f1",
        margin: "0 auto 20px",
        animation: "spin .8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <p style={{ fontWeight: 600, fontSize: 15, color: "#1e293b", marginBottom: 6 }}>
        {STEPS[step]}
      </p>
      <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
        This usually takes 5–15 seconds
      </p>

      {/* Step dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            height: 6,
            width: i === step ? 22 : 6,
            borderRadius: 999,
            background: i <= step ? "#6366f1" : "#e2e8f0",
            transition: "all .3s",
          }} />
        ))}
      </div>
    </div>
  );
}