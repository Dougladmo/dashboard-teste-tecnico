"use client";
import { useMemo, useState, useEffect } from "react";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import { applyFilters, formatCurrency } from "@/lib/filterUtils";
import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const PAGE_SIZE = 15;

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${m}/${d}/${y}`;
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const TableWrapper = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[100]};
  box-shadow: ${theme.shadows.xs};
`;

const TableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

const TableTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

const RecordCount = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 2px 0 0 0;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray[400]};
  width: 16px;
  height: 16px;
  pointer-events: none;
`;

const SearchInput = styled.input`
  padding: 8px 16px 8px 36px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[200]};
  font-size: 14px;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.fonts.outfit};
  background-color: ${theme.colors.white};
  width: 240px;
  transition: border-color 150ms, box-shadow 150ms;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px ${theme.colors.brand[500]};
  }
`;

const OverflowWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.gray[200]} transparent;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 999px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[200]};
    border-radius: 999px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 640px;
  font-size: 14px;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[50]};
  transition: background-color 150ms;

  &:hover {
    background-color: ${theme.colors.gray[50]};
  }
`;

const ThRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[100]};
  background-color: ${theme.colors.gray[50]};
`;

const Th = styled.th`
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 16px;
`;

const Td = styled.td`
  padding: 12px 16px;
  color: ${theme.colors.gray[600]};
`;

const TdCompany = styled(Td)`
  color: ${theme.colors.gray[900]};
  font-weight: 500;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TdDate = styled(Td)`
  white-space: nowrap;
  font-size: 12px;
  font-family: monospace;
`;

const TdIndustry = styled(Td)`
  white-space: nowrap;
`;

const StateBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[600]};
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
`;

const TypeBadge = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $type }) =>
    $type === "income" ? theme.colors.success[50] : theme.colors.error[50]};
  color: ${({ $type }) =>
    $type === "income" ? theme.colors.success[700] : theme.colors.error[700]};
`;

const AmountTd = styled(Td)<{ $type: string }>`
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $type }) =>
    $type === "income" ? theme.colors.success[600] : theme.colors.error[600]};
`;

const EmptyTd = styled.td`
  text-align: center;
  color: ${theme.colors.gray[400]};
  padding: 56px 16px;
  font-size: 14px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid ${theme.colors.gray[100]};
`;

const PageInfo = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 0;
`;

const PageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  background-color: ${({ $active }) => ($active ? theme.colors.brand[500] : "transparent")};
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.gray[600])};
  transition: background-color 150ms, color 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: ${({ $active }) =>
      $active ? theme.colors.brand[500] : theme.colors.gray[100]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const SkeletonWrapper = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid ${theme.colors.gray[50]};
`;

const SkeletonCell = styled.div`
  height: 16px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
  flex: 1;
`;

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

export default function TransactionsTable() {
  const { filters } = useFilters();
  const { transactions, loading } = useData();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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
    return data;
  }, [transactions, filters, search]);

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
                {["Date", "Company", "Industry", "State", "Type", "Amount (BRL)"].map((h) => (
                  <Th key={h}>{h}</Th>
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
