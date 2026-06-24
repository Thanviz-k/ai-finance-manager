import { useState } from "react";
import { analyzeStatement } from "./api";
import UploadZone from "./components/UploadZone";
import SpendingBreakdown from "./components/SpendingBreakdown";
import AdvicePanel from "./components/AdvicePanel";
import TransactionTable from "./components/TransactionTable";
import Loader from "./components/Loader";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface AnalysisResult {
  breakdown: Record<string, number>;
  total: number;
  transactions: Transaction[];
  advice: string;
  provider: "openai" | "gemini";
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [provider] = useState<"openai" | "gemini">("gemini");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const aiBadge = {
    label: "Gemini AI",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  };

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await analyzeStatement(file, provider);
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError("Cannot connect to backend. Make sure it is running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError("");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8" }}>

      {/* Top nav */}
      <nav style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 2rem",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>💸</span>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>AI Finance Coach</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, color: "#6366f1",
          background: "#eef2ff", padding: "4px 10px", borderRadius: 999,
        }}>
          BETA
        </span>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 4rem" }}>

        {/* Hero */}
        {!result && !loading && (
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>💸</div>
            <h1 style={{
              fontSize: 30, fontWeight: 800, color: "#0f172a",
              letterSpacing: "-0.02em", marginBottom: 10,
            }}>
              Know where your money goes
            </h1>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 420, margin: "0 auto" }}>
              Upload your bank statement PDF and get instant spending analysis
              plus personalized advice from AI. No spreadsheets needed.
            </p>
          </div>
        )}

        {/* Upload card */}
        {!result && (
          <div style={{
            background: "white",
            borderRadius: 20,
            padding: "1.75rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            marginBottom: 20,
          }}>
            {!loading ? (
              <>
                <UploadZone file={file} onFile={setFile} />
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 16,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: aiBadge.bg,
                  color: aiBadge.color,
                  fontSize: 13,
                  fontWeight: 700,
                  border: `1px solid ${aiBadge.color}22`,
                }}>
                  <span>🤖 AI coaching mode: {aiBadge.label}</span>
                  <span style={{ fontSize: 12, opacity: 0.8 }}>Smart spending insights</span>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={!file}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    border: "none",
                    background: file ? "#6366f1" : "#e2e8f0",
                    color: file ? "white" : "#94a3b8",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: file ? "pointer" : "not-allowed",
                    transition: "all .15s",
                    marginBottom: 10,
                  }}
                >
                  {file ? "Analyze My Spending" : "Select a PDF first"}
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#cbd5e1" }}>
                  Your PDF is processed locally and analyzed with Gemini for instant coaching tips.
                </p>
              </>
            ) : (
              <Loader />
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            fontSize: 14,
            color: "#dc2626",
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}>
            <span>Warning:</span>
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(14px); }
                to   { opacity: 1; transform: none; }
              }
            `}</style>

            {/* Summary banner */}
            <div style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              borderRadius: 16,
              padding: "1.5rem 1.75rem",
              marginBottom: 16,
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}>
              <div>
                <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Total Spent This Month
                </p>
                <p style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Rs. {result.total.toLocaleString("en-IN")}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>
                  {result.transactions.length} transactions / {Object.keys(result.breakdown).length} categories
                </p>
                <button
                  onClick={reset}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    color: "white",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Analyze another
                </button>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{
              background: "white",
              borderRadius: 16,
              padding: "1.5rem 1.75rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              marginBottom: 16,
            }}>
              <SpendingBreakdown breakdown={result.breakdown} total={result.total} />
            </div>

            {/* Advice */}
            <AdvicePanel advice={result.advice} provider={result.provider} />

            {/* Transactions */}
            {result.transactions.length > 0 && (
              <TransactionTable transactions={result.transactions} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}