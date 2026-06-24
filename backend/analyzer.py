import pandas as pd

CATEGORIES = {
    "Food": ["swiggy", "zomato", "mcdonald", "pizza", "burger", "cafe", "restaurant", "kfc", "domino"],
    "Rent": ["rent", "housing", "landlord", "pg", "accommodation"],
    "Subscriptions": ["netflix", "spotify", "amazon prime", "hotstar", "youtube", "apple"],
    "Transport": ["uber", "ola", "rapido", "metro", "bus", "petrol", "fuel"],
    "Shopping": ["amazon", "flipkart", "myntra", "ajio", "meesho"],
    "Health": ["pharmacy", "hospital", "clinic", "medicine", "apollo", "medplus"],
    "Utilities": ["electricity", "water", "internet", "broadband", "mobile", "recharge"],
}

def categorize(transactions: list[dict]) -> dict:
    df = pd.DataFrame(transactions)
    if df.empty:
        return {}

    def get_category(desc: str) -> str:
        desc_lower = desc.lower()
        for category, keywords in CATEGORIES.items():
            if any(kw in desc_lower for kw in keywords):
                return category
        return "Other"

    df["category"] = df["description"].apply(get_category)
    df["amount"] = df["amount"].abs()  # treat all as positive spend

    summary = df.groupby("category")["amount"].sum().round(2).to_dict()
    total = round(sum(summary.values()), 2)
    return {"breakdown": summary, "total": total, "transactions": df.to_dict(orient="records")}