"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { FilterState } from "@/types";

const FILTER_KEY = "dashboard_filters";

const DEFAULT_FILTERS: FilterState = {
  startDate: "",
  endDate: "",
  accounts: [],
  industries: [],
  states: [],
};

interface FilterContextType {
  filters: FilterState;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  toggleAccount: (a: string) => void;
  toggleIndustry: (i: string) => void;
  toggleState: (s: string) => void;
  setAccounts: (a: string[]) => void;
  setIndustries: (i: string[]) => void;
  setStates: (s: string[]) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
}

function save(f: FilterState) {
  try {
    localStorage.setItem(FILTER_KEY, JSON.stringify(f));
  } catch {
    // ignore
  }
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FILTER_KEY);
      if (raw) setFilters(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const update = useCallback((next: FilterState) => {
    setFilters(next);
    save(next);
  }, []);

  const setStartDate = useCallback((d: string) => {
    setFilters((prev) => { const n = { ...prev, startDate: d }; save(n); return n; });
  }, []);

  const setEndDate = useCallback((d: string) => {
    setFilters((prev) => { const n = { ...prev, endDate: d }; save(n); return n; });
  }, []);

  const toggleAccount = useCallback((a: string) => {
    setFilters((prev) => {
      const exists = prev.accounts.includes(a);
      const n = { ...prev, accounts: exists ? prev.accounts.filter((x) => x !== a) : [...prev.accounts, a] };
      save(n); return n;
    });
  }, []);

  const toggleIndustry = useCallback((i: string) => {
    setFilters((prev) => {
      const exists = prev.industries.includes(i);
      const n = { ...prev, industries: exists ? prev.industries.filter((x) => x !== i) : [...prev.industries, i] };
      save(n); return n;
    });
  }, []);

  const toggleState = useCallback((s: string) => {
    setFilters((prev) => {
      const exists = prev.states.includes(s);
      const n = { ...prev, states: exists ? prev.states.filter((x) => x !== s) : [...prev.states, s] };
      save(n); return n;
    });
  }, []);

  const setAccounts = useCallback((a: string[]) => {
    setFilters((prev) => { const n = { ...prev, accounts: a }; save(n); return n; });
  }, []);

  const setIndustries = useCallback((i: string[]) => {
    setFilters((prev) => { const n = { ...prev, industries: i }; save(n); return n; });
  }, []);

  const setStatesArr = useCallback((s: string[]) => {
    setFilters((prev) => { const n = { ...prev, states: s }; save(n); return n; });
  }, []);

  const resetFilters = useCallback(() => update(DEFAULT_FILTERS), [update]);

  return (
    <FilterContext.Provider value={{
      filters,
      setStartDate, setEndDate,
      toggleAccount, toggleIndustry, toggleState,
      setAccounts, setIndustries, setStates: setStatesArr,
      resetFilters,
    }}>
      {children}
    </FilterContext.Provider>
  );
}
