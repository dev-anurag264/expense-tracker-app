import { useState, useEffect, useCallback } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const API = "http://localhost:8080";

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (sort) params.set("sort", sort);
      const url = `${API}/expenses${params.toString() ? "?" + params : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      setExpenses(await res.json());
    } catch {
      setError("Could not load expenses. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API}/expenses/categories`);
      if (res.ok) setCategories(await res.json());
    } catch {
      // non-fatal
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreated = () => {
    fetchExpenses();
    fetchCategories();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>₹ Expense Tracker</h1>
        <p style={styles.headerSub}>Track where your money goes</p>
      </header>

      <main style={styles.main}>
        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <ExpenseForm onCreated={handleCreated} />
          </aside>

          <section style={styles.content}>
            <div style={styles.filterBar}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="date_desc">Newest first</option>
                  <option value="date_asc">Oldest first</option>
                </select>
              </div>

              {category && (
                <button style={styles.clearBtn} onClick={() => setCategory("")}>
                  ✕ Clear filter
                </button>
              )}
            </div>

            <div style={styles.listCard}>
              <ExpenseList
                expenses={expenses}
                loading={loading}
                error={error}
              />
            </div>

            {!loading && !error && expenses.length > 0 && (
              <div style={styles.totalBar}>
                <span style={styles.totalLabel}>
                  {category ? `Total for "${category}"` : "Total"}
                  {" · "}
                  <span style={{ color: "#9ca3af" }}>
                    {expenses.length}{" "}
                    {expenses.length === 1 ? "entry" : "entries"}
                  </span>
                </span>
                <span style={styles.totalAmount}>{formatINR(total)}</span>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
  },
  header: {
    background: "#1e3a5f",
    color: "#fff",
    padding: "1.25rem 2rem",
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: 0,
  },
  headerSub: {
    fontSize: "0.85rem",
    color: "#93c5fd",
    margin: "0.2rem 0 0",
  },
  main: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "1.5rem",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "1.5rem",
    alignItems: "start",
  },
  sidebar: {},
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  filterBar: {
    display: "flex",
    alignItems: "flex-end",
    gap: "1rem",
    background: "#fff",
    padding: "1rem 1.25rem",
    borderRadius: "8px 8px 0 0",
    borderBottom: "1px solid #e5e7eb",
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  filterLabel: {
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  filterSelect: {
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "0.45rem 0.75rem",
    fontSize: "0.9rem",
    color: "#111827",
    background: "#fff",
    cursor: "pointer",
    minWidth: 160,
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#ef4444",
    fontSize: "0.82rem",
    cursor: "pointer",
    alignSelf: "flex-end",
    padding: "0.4rem 0",
  },
  listCard: {
    background: "#fff",
  },
  totalBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "0.9rem 1.25rem",
    borderRadius: "0 0 8px 8px",
    borderTop: "2px solid #1e3a5f",
  },
  totalLabel: {
    fontSize: "0.82rem",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  totalAmount: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#1e3a5f",
  },
};
