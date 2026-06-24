const BASE = "http://127.0.0.1:8000";

export async function analyzeStatement(
  file: File,
  provider: "openai" | "gemini"
): Promise<any> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE}/analyze?provider=${provider}`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Analysis failed");
  }

  return res.json();
}