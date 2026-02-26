import { applyFilters, calcMetrics, groupByMonth, formatCurrency } from "@/lib/filterUtils";
import type { Transaction, FilterState } from "@/types";

const makeTransaction = (overrides: Partial<Transaction> = {}): Transaction => ({
  id: "txn-001",
  date: "2023-06-15",
  amount: 100.0,
  type: "income",
  currency: "brl",
  account: "Acme Corp",
  industry: "Technology",
  state: "CA",
  ...overrides,
});

const emptyFilters: FilterState = {
  startDate: "",
  endDate: "",
  accounts: [],
  industries: [],
  states: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// applyFilters
// ─────────────────────────────────────────────────────────────────────────────
describe("applyFilters", () => {
  const transactions: Transaction[] = [
    makeTransaction({ id: "1", date: "2022-01-10", type: "income", account: "Acme Corp", industry: "Technology", state: "CA" }),
    makeTransaction({ id: "2", date: "2022-06-20", type: "expense", account: "Beta Inc", industry: "Hotels", state: "NY" }),
    makeTransaction({ id: "3", date: "2023-03-05", type: "income", account: "Acme Corp", industry: "Technology", state: "TX" }),
    makeTransaction({ id: "4", date: "2023-11-30", type: "expense", account: "Gamma Ltd", industry: "Airlines", state: "FL" }),
  ];

  it("returns all transactions when no filters are set", () => {
    expect(applyFilters(transactions, emptyFilters)).toHaveLength(4);
  });

  it("filters by start date (inclusive)", () => {
    const result = applyFilters(transactions, { ...emptyFilters, startDate: "2023-01-01" });
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(["3", "4"]);
  });

  it("filters by end date (inclusive)", () => {
    const result = applyFilters(transactions, { ...emptyFilters, endDate: "2022-12-31" });
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(["1", "2"]);
  });

  it("filters by start and end date range", () => {
    const result = applyFilters(transactions, { ...emptyFilters, startDate: "2022-06-01", endDate: "2023-06-30" });
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(["2", "3"]);
  });

  it("filters by a single account", () => {
    const result = applyFilters(transactions, { ...emptyFilters, accounts: ["Acme Corp"] });
    expect(result).toHaveLength(2);
    result.forEach((t) => expect(t.account).toBe("Acme Corp"));
  });

  it("filters by multiple accounts", () => {
    const result = applyFilters(transactions, { ...emptyFilters, accounts: ["Acme Corp", "Gamma Ltd"] });
    expect(result).toHaveLength(3);
  });

  it("filters by industry", () => {
    const result = applyFilters(transactions, { ...emptyFilters, industries: ["Hotels"] });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters by state", () => {
    const result = applyFilters(transactions, { ...emptyFilters, states: ["CA", "TX"] });
    expect(result).toHaveLength(2);
  });

  it("combines multiple filters (AND logic)", () => {
    const result = applyFilters(transactions, {
      ...emptyFilters,
      startDate: "2022-01-01",
      endDate: "2023-12-31",
      accounts: ["Acme Corp"],
      states: ["CA"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("returns empty array when no transactions match", () => {
    const result = applyFilters(transactions, { ...emptyFilters, states: ["HI"] });
    expect(result).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// calcMetrics
// ─────────────────────────────────────────────────────────────────────────────
describe("calcMetrics", () => {
  it("returns zeros for an empty array", () => {
    const m = calcMetrics([]);
    expect(m.revenue).toBe(0);
    expect(m.expenses).toBe(0);
    expect(m.total).toBe(0);
    expect(m.balance).toBe(0);
  });

  it("correctly sums revenue (income transactions)", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 150.0 }),
      makeTransaction({ type: "income", amount: 200.5 }),
      makeTransaction({ type: "expense", amount: 50.0 }),
    ];
    const m = calcMetrics(txns);
    expect(m.revenue).toBeCloseTo(350.5);
  });

  it("correctly sums expenses (expense transactions)", () => {
    const txns = [
      makeTransaction({ type: "expense", amount: 75.25 }),
      makeTransaction({ type: "expense", amount: 24.75 }),
      makeTransaction({ type: "income", amount: 500.0 }),
    ];
    const m = calcMetrics(txns);
    expect(m.expenses).toBeCloseTo(100.0);
  });

  it("calculates balance as revenue minus expenses", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 300.0 }),
      makeTransaction({ type: "expense", amount: 120.0 }),
    ];
    const m = calcMetrics(txns);
    expect(m.balance).toBeCloseTo(180.0);
  });

  it("returns negative balance when expenses exceed revenue", () => {
    const txns = [
      makeTransaction({ type: "income", amount: 100.0 }),
      makeTransaction({ type: "expense", amount: 250.0 }),
    ];
    const m = calcMetrics(txns);
    expect(m.balance).toBeCloseTo(-150.0);
  });

  it("counts total transactions correctly", () => {
    const txns = [
      makeTransaction({ type: "income" }),
      makeTransaction({ type: "expense" }),
      makeTransaction({ type: "income" }),
    ];
    expect(calcMetrics(txns).total).toBe(3);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// groupByMonth
// ─────────────────────────────────────────────────────────────────────────────
describe("groupByMonth", () => {
  it("returns empty arrays for no transactions", () => {
    const result = groupByMonth([]);
    expect(result.months).toHaveLength(0);
    expect(result.incomes).toHaveLength(0);
    expect(result.expenses).toHaveLength(0);
    expect(result.balances).toHaveLength(0);
  });

  it("groups transactions into correct months", () => {
    const txns = [
      makeTransaction({ date: "2023-01-10", type: "income", amount: 100 }),
      makeTransaction({ date: "2023-01-25", type: "expense", amount: 40 }),
      makeTransaction({ date: "2023-02-05", type: "income", amount: 200 }),
    ];
    const result = groupByMonth(txns);
    expect(result.months).toHaveLength(2);
    expect(result.incomes[0]).toBeCloseTo(100);
    expect(result.expenses[0]).toBeCloseTo(40);
    expect(result.incomes[1]).toBeCloseTo(200);
  });

  it("computes cumulative balance across months", () => {
    const txns = [
      makeTransaction({ date: "2023-01-01", type: "income", amount: 500 }),
      makeTransaction({ date: "2023-01-01", type: "expense", amount: 200 }),
      makeTransaction({ date: "2023-02-01", type: "income", amount: 100 }),
      makeTransaction({ date: "2023-02-01", type: "expense", amount: 50 }),
    ];
    const result = groupByMonth(txns);
    // Jan balance = 500 - 200 = 300
    // Feb balance = 300 + (100 - 50) = 350
    expect(result.balances[0]).toBeCloseTo(300);
    expect(result.balances[1]).toBeCloseTo(350);
  });

  it("sorts months chronologically", () => {
    const txns = [
      makeTransaction({ date: "2023-03-01", type: "income", amount: 1 }),
      makeTransaction({ date: "2023-01-01", type: "income", amount: 1 }),
      makeTransaction({ date: "2023-02-01", type: "income", amount: 1 }),
    ];
    const result = groupByMonth(txns);
    // Should be Jan, Feb, Mar
    expect(result.months[0]).toMatch(/Jan/i);
    expect(result.months[1]).toMatch(/Feb/i);
    expect(result.months[2]).toMatch(/Mar/i);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// formatCurrency
// ─────────────────────────────────────────────────────────────────────────────
describe("formatCurrency", () => {
  it("formats positive values with dollar sign", () => {
    expect(formatCurrency(1234.56)).toMatch(/\$1,234\.56/);
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toMatch(/\$0\.00/);
  });

  it("formats negative values", () => {
    expect(formatCurrency(-500)).toMatch(/-?\$?500\.00/);
  });

  it("always shows two decimal places", () => {
    expect(formatCurrency(100)).toMatch(/100\.00/);
    expect(formatCurrency(99.9)).toMatch(/99\.90/);
  });
});
