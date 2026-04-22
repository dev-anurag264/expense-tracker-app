import { useState } from "react";

const today = () => new Date().toISOString().split("T")[0];
const API = "http://localhost:8080";
const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Utilities",
  "Health",
  "Entertainment",
  "Travel",
  "Other",
];

function genKey() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ExpenseForm({ onCreated }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: today(),
  });
  const [idempotencyKey, setIdempotencyKey] = useState(genKey);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount greater than 0";
    if (!form.category) e.category = "Please select a category";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(form.amount),
          category: form.category,
          description: form.description.trim(),
          date: form.date,
          idempotencyKey,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.title || "Something went wrong");
        }
        return;
      }

      setForm({ amount: "", category: "", description: "", date: today() });
      setIdempotencyKey(genKey());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onCreated();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Add Expense</h2>

      {serverError && <p style={styles.errorBanner}>{serverError}</p>}
      {success && <p style={styles.successBanner}>✓ Expense saved!</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Amount (₹)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={set("amount")}
              style={{
                ...styles.input,
                ...(errors.amount ? styles.inputError : {}),
              }}
              disabled={loading}
            />
            {errors.amount && (
              <span style={styles.fieldError}>{errors.amount}</span>
            )}
          </div>
          <span> </span>
          <div style={styles.field}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              max={today()}
              value={form.date}
              onChange={set("date")}
              style={{
                ...styles.input,
                ...(errors.date ? styles.inputError : {}),
              }}
              disabled={loading}
            />
            {errors.date && (
              <span style={styles.fieldError}>{errors.date}</span>
            )}
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            value={form.category}
            onChange={set("category")}
            style={{
              ...styles.input,
              ...(errors.category ? styles.inputError : {}),
            }}
            disabled={loading}
          >
            <option value="">Select category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <span style={styles.fieldError}>{errors.category}</span>
          )}
        </div>

        {/* Description */}
        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            placeholder="What was this for?"
            maxLength={500}
            value={form.description}
            onChange={set("description")}
            style={{
              ...styles.input,
              ...(errors.description ? styles.inputError : {}),
            }}
            disabled={loading}
          />
          {errors.description && (
            <span style={styles.fieldError}>{errors.description}</span>
          )}
        </div>

        <button type="submit" style={styles.submitBtn} disabled={loading}>
          {loading ? "Saving…" : "+ Add Expense"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: "1.5rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "1.25rem",
    color: "#111827",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: "1rem",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  input: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#081933",
    borderRadius: 6,
    padding: "0.5rem 0.75rem",
    fontSize: "0.95rem",
    color: "#111827",
    background: "#dedede",
    width: "100%",
    outline: "none",
    transition: "border-color 0.15s",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  fieldError: {
    fontSize: "0.75rem",
    color: "#ef4444",
  },
  submitBtn: {
    width: "100%",
    padding: "0.65rem",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "0.95rem",
    fontWeight: 600,
    marginTop: "0.25rem",
    transition: "background 0.15s",
  },
  errorBanner: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    borderRadius: 6,
    padding: "0.6rem 0.9rem",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  successBanner: {
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
    borderRadius: 6,
    padding: "0.6rem 0.9rem",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
};
