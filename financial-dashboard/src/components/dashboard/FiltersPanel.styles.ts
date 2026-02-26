import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

// ─── Animation ────────────────────────────────────────────────────────────────
export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// ─── Panel ────────────────────────────────────────────────────────────────────
export const PanelCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[100]};
  box-shadow: ${theme.shadows.xs};
  padding: 20px;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterIcon = styled.svg`
  color: ${theme.colors.gray[500]};
`;

export const PanelTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

export const ActiveBadge = styled.span`
  padding: 2px 8px;
  background-color: ${theme.colors.brand[50]};
  color: ${theme.colors.brand[600]};
  font-size: 12px;
  font-weight: 500;
  border-radius: 999px;
`;

export const ClearButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.error[600]};
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 150ms;

  &:hover {
    color: ${theme.colors.error[700]};
  }
`;

// ─── Grid ─────────────────────────────────────────────────────────────────────
export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonBlock = styled.div`
  height: 64px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

// ─── Field ────────────────────────────────────────────────────────────────────
export const FieldLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
`;
