export type TransactionType = "income" | "expense";

export interface RawTransaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number; // "5565" → 55.65
  type: TransactionType;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export interface FilterState {
  startDate: string;
  endDate: string;
  accounts: string[];
  industries: string[];
  states: string[];
}

export interface User {
  email: string;
  name: string;
}

export interface AuthSession {
  user: User;
  loggedAt: string;
}
