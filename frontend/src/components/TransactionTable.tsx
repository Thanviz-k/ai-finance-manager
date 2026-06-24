import { useState } from "react";
import { getCat } from "../constants";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  const [showAll, setShowAll] = useState(false);
  const rows = showAll ? transactions : transactions.slice(0, 6);

  return (
    <div style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 20,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid #f1f5f9",
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>
          Transactions
          <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 13, marginLeft: 6 }}>
            ({transactions.length})
          </span>
        </h2>
        {transactions.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              fontSize: 13, fontWeight: 600,
              color: "#6366f1",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {showAll ? "Show less" : `Show all ${transactions.length}`}
          </button>
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Date", "Description", "Category", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 20px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    textAlign: h === "Amount" ? "right" : "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((tx, i) => {
              const c = getCat(tx.category);
              return (
                <tr key={i} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 20px", fontSize: 13, color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {tx.date}
                  </td>
                  <td style={{
                    padding: "10px 20px", fontSize: 13, color: "#1e293b",
                    maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {tx.description}
                  </td>
                  <td style={{ padding: "10px 20px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: c.text, background: c.bg,
                      padding: "3px 10px", borderRadius: 999,
                    }}>
                      {c.icon} {tx.category}
                    </span>
                  </td>
                  <td style={{
                    padding: "10px 20px", fontSize: 13, fontWeight: 600,
                    color: "#ef4444", textAlign: "right",
                  }}>
                    Rs. {Math.abs(tx.amount).toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}