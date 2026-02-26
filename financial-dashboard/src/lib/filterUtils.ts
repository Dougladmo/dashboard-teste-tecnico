import type { Transaction, FilterState } from "@/types";

export function applyFilters(transactions: Transaction[], filters: FilterState): Transaction[] {
  return transactions.filter((t) => {
    if (filters.startDate && t.date < filters.startDate) return false;
    if (filters.endDate && t.date > filters.endDate) return false;
    if (filters.accounts.length > 0 && !filters.accounts.includes(t.account)) return false;
    if (filters.industries.length > 0 && !filters.industries.includes(t.industry)) return false;
    if (filters.states.length > 0 && !filters.states.includes(t.state)) return false;
    return true;
  });
}

export function calcMetrics(transactions: Transaction[]) {
  const revenue = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return {
    revenue,
    expenses,
    total: transactions.length,
    balance: revenue - expenses,
  };
}

export function groupByMonth(transactions: Transaction[]): {
  months: string[];
  incomes: number[];
  expenses: number[];
  balances: number[];
} {
  const monthMap: Record<string, { income: number; expense: number }> = {};

  for (const t of transactions) {
    const key = t.date.substring(0, 7); // YYYY-MM
    if (!monthMap[key]) monthMap[key] = { income: 0, expense: 0 };
    if (t.type === "income") monthMap[key].income += t.amount;
    else monthMap[key].expense += t.amount;
  }

  const sortedKeys = Object.keys(monthMap).sort();

  const months = sortedKeys.map((k) => {
    const [year, month] = k.split("-");
    const d = new Date(parseInt(year), parseInt(month) - 1);
    return d.toLocaleString("en-US", { month: "short", year: "2-digit" });
  });

  const incomes = sortedKeys.map((k) => Math.round(monthMap[k].income * 100) / 100);
  const expenses = sortedKeys.map((k) => Math.round(monthMap[k].expense * 100) / 100);

  let cumulative = 0;
  const balances = sortedKeys.map((k) => {
    cumulative += monthMap[k].income - monthMap[k].expense;
    return Math.round(cumulative * 100) / 100;
  });

  return { months, incomes, expenses, balances };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
