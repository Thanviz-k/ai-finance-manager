export interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface AnalysisResult {
  breakdown: Record<string, number>;
  total: number;
  transactions: Transaction[];
  advice: string;
  provider: "openai" | "gemini";
}