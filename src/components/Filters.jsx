function Filters({ categories, setFilter, setSort }) {
  return (
    <div className="controls">
      <select onChange={(e) => setFilter(e.target.value)} className="input">
        <option value="">All Categories</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSort(e.target.value)} className="input">
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
      </select>
    </div>
  );
}

export default Filters;
