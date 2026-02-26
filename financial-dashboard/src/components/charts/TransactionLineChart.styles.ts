import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

// ─── Animation ────────────────────────────────────────────────────────────────
export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────
export const ChartCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[100]};
  box-shadow: ${theme.shadows.xs};
  padding: 20px;
  min-width: 0;
`;

export const ChartTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0 0 16px 0;
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonWrapper = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
`;

export const SkeletonTitle = styled.div`
  height: 16px;
  width: 256px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
`;

export const SkeletonChart = styled.div`
  height: 208px;
  background-color: ${theme.colors.gray[50]};
  border-radius: 8px;
`;

// ─── Scroll Wrapper ───────────────────────────────────────────────────────────
export const ChartScrollWrapper = styled.div`
  max-width: 100%;
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

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 208px;
  color: ${theme.colors.gray[400]};
  font-size: 14px;
`;
