"use client";
import { useMemo, useState, useEffect } from "react";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import { applyFilters, formatCurrency } from "@/lib/filterUtils";
import {
  TableWrapper, TableHeader,
  TableTitle, RecordCount,
  SearchWrapper, SearchIcon, SearchInput,
  OverflowWrapper,
  Table,
  Tr, ThRow,
  Th, ThContent, SortIcon,
  Td, TdCompany, TdDate, TdIndustry,
  StateBadge, TypeBadge,
  AmountTd, EmptyTd,
  Pagination, PageInfo, PageButtons, PageButton,
  SkeletonWrapper, SkeletonRow, SkeletonCell,
} from "./TransactionsTable.styles";

const PAGE_SIZE = 15;

type SortKey = "date" | "account" | "industry" | "state" | "type" | "amount";
type SortDir = "asc" | "desc";

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${m}/${d}/${y}`;
}

function SkeletonTable() {
  return (
    <SkeletonWrapper>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonRow key={i}>
          {Array.from({ length: 6 }).map((_, j) => (
            <SkeletonCell key={j} />
          ))}
        </SkeletonRow>
      ))}
    </SkeletonWrapper>
  );
}

const COLUMNS: { label: string; key: SortKey }[] = [
  { label: "Date", key: "date" },
  { label: "Company", key: "account" },
  { label: "Industry", key: "industry" },
  { label: "State", key: "state" },
  { label: "Type", key: "type" },
  { label: "Amount (BRL)", key: "amount" },
];

export default function TransactionsTable() {
  const { filters } = useFilters();
  const { transactions, loading } = useData();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const filtered = useMemo(() => {
    let data = applyFilters(transactions, filters);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.account.toLowerCase().includes(q) ||
          t.industry.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q)
      );
    }
    data = [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      let cmp = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        cmp = aVal - bVal;
      } else {
        cmp = String(aVal).localeCompare(String(bVal));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [transactions, filters, search, sortKey, sortDir]);

  useEffect(() => {
    setPage(1);
  }, [filters, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageData = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageNums: number[] = [];
  const start = Math.max(1, Math.min(safePage - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  for (let p = start; p <= end; p++) pageNums.push(p);

  return (
    <TableWrapper>
      <TableHeader>
        <div>
          <TableTitle>Transactions</TableTitle>
          {!loading && (
            <RecordCount>{filtered.length.toLocaleString("en-US")} records found</RecordCount>
          )}
        </div>
        <SearchWrapper>
          <SearchIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search company, industry, state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>
      </TableHeader>

      {loading ? (
        <SkeletonTable />
      ) : (
        <OverflowWrapper>
          <Table>
            <thead>
              <ThRow>
                {COLUMNS.map(({ label, key }) => (
                  <Th
                    key={key}
                    $sortable
                    $active={sortKey === key}
                    onClick={() => handleSort(key)}
                  >
                    <ThContent>
                      {label}
                      <SortIcon
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        $visible={sortKey === key}
                      >
                        {sortKey === key && sortDir === "asc" ? (
                          <polyline points="18 15 12 9 6 15" />
                        ) : sortKey === key && sortDir === "desc" ? (
                          <polyline points="6 9 12 15 18 9" />
                        ) : (
                          <>
                            <polyline points="18 15 12 9 6 15" />
                          </>
                        )}
                      </SortIcon>
                    </ThContent>
                  </Th>
                ))}
              </ThRow>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <EmptyTd colSpan={6}>No transactions found</EmptyTd>
                </tr>
              ) : (
                pageData.map((t) => (
                  <Tr key={t.id}>
                    <TdDate>{formatDate(t.date)}</TdDate>
                    <TdCompany>{t.account}</TdCompany>
                    <TdIndustry>{t.industry}</TdIndustry>
                    <Td>
                      <StateBadge>{t.state}</StateBadge>
                    </Td>
                    <Td>
                      <TypeBadge $type={t.type}>
                        {t.type === "income" ? "Revenue" : "Expense"}
                      </TypeBadge>
                    </Td>
                    <AmountTd $type={t.type}>
                      {t.type === "expense" ? "-" : "+"}
                      {formatCurrency(t.amount)}
                    </AmountTd>
                  </Tr>
                ))
              )}
            </tbody>
          </Table>
        </OverflowWrapper>
      )}

      {!loading && (
        <Pagination>
          <PageInfo>
            Page {safePage} of {totalPages}
          </PageInfo>
          <PageButtons>
            <PageButton onClick={() => setPage(1)} disabled={safePage === 1} title="First">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </PageButton>
            <PageButton
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </PageButton>
            {pageNums.map((p) => (
              <PageButton key={p} onClick={() => setPage(p)} $active={p === safePage}>
                {p}
              </PageButton>
            ))}
            <PageButton
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </PageButton>
            <PageButton
              onClick={() => setPage(totalPages)}
              disabled={safePage === totalPages}
              title="Last"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </PageButton>
          </PageButtons>
        </Pagination>
      )}
    </TableWrapper>
  );
}
