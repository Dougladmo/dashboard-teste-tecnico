import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

// ─── Animation ────────────────────────────────────────────────────────────────
export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// ─── Container ────────────────────────────────────────────────────────────────
export const TableWrapper = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[100]};
  box-shadow: ${theme.shadows.xs};
`;

export const TableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

// ─── Header Title ─────────────────────────────────────────────────────────────
export const TableTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

export const RecordCount = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 2px 0 0 0;
`;

// ─── Search ───────────────────────────────────────────────────────────────────
export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled.svg`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray[400]};
  width: 16px;
  height: 16px;
  pointer-events: none;
`;

export const SearchInput = styled.input`
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

// ─── Table Scroll ─────────────────────────────────────────────────────────────
export const OverflowWrapper = styled.div`
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

// ─── Table Base ───────────────────────────────────────────────────────────────
export const Table = styled.table`
  width: 100%;
  min-width: 640px;
  font-size: 14px;
  border-collapse: collapse;
`;

// ─── Table Rows ───────────────────────────────────────────────────────────────
export const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[50]};
  transition: background-color 150ms;

  &:hover {
    background-color: ${theme.colors.gray[50]};
  }
`;

export const ThRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[100]};
  background-color: ${theme.colors.gray[50]};
`;

// ─── Table Header Cells ───────────────────────────────────────────────────────
interface ThProps { $sortable?: boolean; $active?: boolean }
export const Th = styled.th<ThProps>`
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? theme.colors.brand[600] : theme.colors.gray[500])};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 16px;
  cursor: ${({ $sortable }) => ($sortable ? "pointer" : "default")};
  user-select: none;
  white-space: nowrap;

  &:hover {
    color: ${({ $sortable }) => ($sortable ? theme.colors.brand[600] : theme.colors.gray[500])};
  }
`;

export const ThContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

interface SortIconProps { $visible: boolean }
export const SortIcon = styled.svg<SortIconProps>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0.3)};
  flex-shrink: 0;
`;

// ─── Table Data Cells ─────────────────────────────────────────────────────────
export const Td = styled.td`
  padding: 12px 16px;
  color: ${theme.colors.gray[600]};
`;

export const TdCompany = styled(Td)`
  color: ${theme.colors.gray[900]};
  font-weight: 500;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TdDate = styled(Td)`
  white-space: nowrap;
  font-size: 12px;
  font-family: monospace;
`;

export const TdIndustry = styled(Td)`
  white-space: nowrap;
`;

// ─── Badges ───────────────────────────────────────────────────────────────────
export const StateBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[600]};
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
`;

interface TypeBadgeProps { $type: string }
export const TypeBadge = styled.span<TypeBadgeProps>`
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

interface AmountTdProps { $type: string }
export const AmountTd = styled(Td)<AmountTdProps>`
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $type }) =>
    $type === "income" ? theme.colors.success[600] : theme.colors.error[600]};
`;

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyTd = styled.td`
  text-align: center;
  color: ${theme.colors.gray[400]};
  padding: 56px 16px;
  font-size: 14px;
`;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid ${theme.colors.gray[100]};
`;

export const PageInfo = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 0;
`;

export const PageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface PageButtonProps { $active?: boolean }
export const PageButton = styled.button<PageButtonProps>`
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

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonWrapper = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const SkeletonRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid ${theme.colors.gray[50]};
`;

export const SkeletonCell = styled.div`
  height: 16px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
  flex: 1;
`;
