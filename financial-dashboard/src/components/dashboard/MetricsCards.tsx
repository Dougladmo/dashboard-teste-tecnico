"use client";
import { useMemo } from "react";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import { applyFilters, calcMetrics, formatCurrency } from "@/lib/filterUtils";
import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const MetricsGrid = styled.div`
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

const MetricCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  padding: 20px;
  box-shadow: ${theme.shadows.xs};
  border: 1px solid ${theme.colors.gray[100]};
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const IconWrapper = styled.div<{ $bg: string }>`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bg }) => $bg};
`;

const CardContent = styled.div`
  min-width: 0;
  flex: 1;
`;

const CardTitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  font-weight: 500;
  margin: 0;
`;

const CardValue = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: 2px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SkeletonValue = styled.div`
  margin-top: 4px;
  height: 28px;
  width: 128px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const CardSubtitle = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 4px 0 0 0;
`;

interface CardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  loading?: boolean;
}

function Card({ title, value, subtitle, icon, iconBg, loading }: CardProps) {
  return (
    <MetricCard>
      <IconWrapper $bg={iconBg}>{icon}</IconWrapper>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {loading ? <SkeletonValue /> : <CardValue>{value}</CardValue>}
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardContent>
    </MetricCard>
  );
}

export default function MetricsCards() {
  const { filters } = useFilters();
  const { transactions, loading } = useData();

  const metrics = useMemo(() => {
    const filtered = applyFilters(transactions, filters);
    return calcMetrics(filtered);
  }, [transactions, filters]);

  return (
    <MetricsGrid>
      <Card
        title="Revenue"
        value={formatCurrency(metrics.revenue)}
        subtitle="Total inflows in period"
        iconBg={theme.colors.success[50]}
        loading={loading}
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#12b76a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        }
      />
      <Card
        title="Expenses"
        value={formatCurrency(metrics.expenses)}
        subtitle="Total outflows in period"
        iconBg={theme.colors.error[50]}
        loading={loading}
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f04438" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        }
      />
      <Card
        title="Transactions"
        value={metrics.total.toLocaleString("en-US")}
        subtitle="Total in filtered period"
        iconBg={theme.colors.brand[50]}
        loading={loading}
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#465fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        }
      />
      <Card
        title="Net Balance"
        value={formatCurrency(metrics.balance)}
        subtitle={metrics.balance >= 0 ? "Positive balance in period" : "Negative balance in period"}
        iconBg={metrics.balance >= 0 ? theme.colors.success[50] : theme.colors.error[50]}
        loading={loading}
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={metrics.balance >= 0 ? "#12b76a" : "#f04438"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        }
      />
    </MetricsGrid>
  );
}
