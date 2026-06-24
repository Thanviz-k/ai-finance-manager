import { useRef, useState, useCallback } from "react";

interface Props {
  file: File | null;
  onFile: (f: File) => void;
}

export default function UploadZone({ file, onFile }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer.files[0];
      if (f?.type === "application/pdf") onFile(f);
    },
    [onFile]
  );

  const borderColor = drag ? "#6366f1" : file ? "#22c55e" : "#cbd5e1";
  const bgColor     = drag ? "#eef2ff" : file ? "#f0fdf4" : "#fafafa";

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${borderColor}`,
        borderRadius: 14,
        background: bgColor,
        padding: "2.5rem 1.5rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "all .2s",
        marginBottom: 20,
      }}
    >
      <input
        ref={ref}
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <div style={{ fontSize: 40, marginBottom: 10 }}>
        {file ? "✅" : "📄"}
      </div>
      <p style={{ fontWeight: 600, fontSize: 15, color: file ? "#15803d" : "#1e293b", marginBottom: 4 }}>
        {file ? file.name : "Drop your bank statement here"}
      </p>
      <p style={{ fontSize: 13, color: "#94a3b8" }}>
        {file
          ? `${(file.size / 1024).toFixed(1)} KB · click to change`
          : "PDF only · click or drag & drop"}
      </p>
    </div>
  );
}