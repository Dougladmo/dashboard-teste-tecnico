import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

// ─── Animation ────────────────────────────────────────────────────────────────
export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// ─── Grid ─────────────────────────────────────────────────────────────────────
export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${theme.breakpoints.xl}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────
export const MetricCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  padding: 20px;
  box-shadow: ${theme.shadows.xs};
  border: 1px solid ${theme.colors.gray[100]};
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

interface IconWrapperProps { $bg: string }
export const IconWrapper = styled.div<IconWrapperProps>`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bg }) => $bg};
`;

export const CardContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const CardTitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  font-weight: 500;
  margin: 0;
`;

export const CardValue = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: 2px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonValue = styled.div`
  margin-top: 4px;
  height: 28px;
  width: 128px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

// ─── Subtitle ─────────────────────────────────────────────────────────────────
export const CardSubtitle = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 4px 0 0 0;
`;
