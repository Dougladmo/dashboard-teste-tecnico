"use client";
import { useMemo } from "react";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import { applyFilters, calcMetrics, formatCurrency } from "@/lib/filterUtils";
import { theme } from "@/styles/theme";
import {
  MetricsGrid,
  MetricCard,
  IconWrapper,
  CardContent,
  CardTitle,
  CardValue,
  SkeletonValue,
  CardSubtitle,
} from "./MetricsCards.styles";

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
