"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Transaction, RawTransaction } from "@/types";

function toISODate(epochMs: number): string {
  return new Date(epochMs).toISOString().split("T")[0];
}

function parseAmount(s: string): number {
  const n = parseInt(s, 10);
  return isNaN(n) ? 0 : n / 100;
}

function transform(raw: RawTransaction, idx: number): Transaction {
  return {
    id: `txn-${idx}`,
    date: toISODate(raw.date),
    amount: parseAmount(raw.amount),
    type: raw.transaction_type === "deposit" ? "income" : "expense",
    currency: raw.currency,
    account: raw.account,
    industry: raw.industry,
    state: raw.state,
  };
}

interface DataContextType {
  transactions: Transaction[];
  loading: boolean;
  accounts: string[];
  industries: string[];
  states: string[];
  minDate: string;
  maxDate: string;
}

const DataContext = createContext<DataContextType>({
  transactions: [],
  loading: true,
  accounts: [],
  industries: [],
  states: [],
  minDate: "",
  maxDate: "",
});

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    fetch("/api/transactions")
      .then((r) => r.json())
      .then((raw: RawTransaction[]) => {
        const txns = raw
          .map(transform)
          .sort((a, b) => a.date.localeCompare(b.date));

        setTransactions(txns);
        setAccounts([...new Set(txns.map((t) => t.account))].sort());
        setIndustries([...new Set(txns.map((t) => t.industry))].sort());
        setStates([...new Set(txns.map((t) => t.state))].sort());

        if (txns.length > 0) {
          setMinDate(txns[0].date);
          setMaxDate(txns[txns.length - 1].date);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider
      value={{ transactions, loading, accounts, industries, states, minDate, maxDate }}
    >
      {children}
    </DataContext.Provider>
  );
}
