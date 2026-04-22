const CATEGORY_COLORS = {
  "Food & Dining": "#f97316",
  Transport: "#3b82f6",
  Shopping: "#a855f7",
  Utilities: "#6b7280",
  Health: "#22c55e",
  Entertainment: "#ec4899",
  Travel: "#14b8a6",
  Other: "#78716c",
};

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseList({ expenses, loading, error }) {
  if (loading) {
    return <p style={styles.state}>Loading expenses…</p>;
  }

  if (error) {
    return <p style={{ ...styles.state, color: "#dc2626" }}>⚠ {error}</p>;
  }

  if (expenses.length === 0) {
    return <p style={styles.state}>No expenses found. Add one!</p>;
  }

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Description</th>
            <th style={{ ...styles.th, textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} style={styles.tr}>
              <td style={styles.tdDate}>{formatDate(exp.date)}</td>
              <td style={styles.td}>
                <span>{exp.category}</span>
              </td>
              <td style={styles.td}>{exp.description}</td>
              <td
                style={{
                  ...styles.td,
                  textAlign: "right",
                  fontWeight: 600,
                  color: "#dc2626",
                }}
              >
                {formatINR(exp.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  state: {
    textAlign: "center",
    color: "#6b7280",
    padding: "3rem 1rem",
    fontSize: "0.95rem",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  thead: {
    background: "#f9fafb",
    borderBottom: "2px solid #e5e7eb",
  },
  th: {
    padding: "0.65rem 1rem",
    textAlign: "left",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#6b7280",
  },
  tr: {
    borderBottom: "1px solid #f3f4f6",
  },
  td: {
    padding: "0.7rem 1rem",
    color: "#111827",
  },
  tdDate: {
    padding: "0.7rem 1rem",
    color: "#6b7280",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  },
  badge: {
    display: "inline-block",
    padding: "0.2rem 0.55rem",
    borderRadius: 4,
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#fff",
    whiteSpace: "nowrap",
  },
};
