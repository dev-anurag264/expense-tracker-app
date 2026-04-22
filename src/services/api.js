const BASE_URL = "http://localhost:8080/expenses";

export const getExpenses = async (category, sort) => {
  let url = `${BASE_URL}?sort=${sort}`;
  if (category) url += `&category=${category}`;

  const res = await fetch(url);
  return res.json();
};

export const addExpense = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};
