import pdfplumber
import re

def extract_transactions(pdf_path: str) -> list[dict]:
    transactions = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
            for line in text.split("\n"):
                # Matches lines like: 12 Jan  Swiggy  -450.00
                match = re.search(
                    r'(\d{1,2}[\s\-]\w{3,9}[\s\-]\d{0,4})\s+(.+?)\s+([\-\+]?\d+[\.,]\d{2})',
                    line
                )
                if match:
                    transactions.append({
                        "date": match.group(1).strip(),
                        "description": match.group(2).strip(),
                        "amount": float(match.group(3).replace(",", ""))
                    })
    return transactions