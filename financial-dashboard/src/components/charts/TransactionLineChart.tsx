"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import { applyFilters, groupByMonth } from "@/lib/filterUtils";
import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const ChartCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[100]};
  box-shadow: ${theme.shadows.xs};
  padding: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0 0 16px 0;
`;

const SkeletonWrapper = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
`;

const SkeletonTitle = styled.div`
  height: 16px;
  width: 256px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
`;

const SkeletonChart = styled.div`
  height: 208px;
  background-color: ${theme.colors.gray[50]};
  border-radius: 8px;
`;

const ChartScrollWrapper = styled.div`
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

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 208px;
  color: ${theme.colors.gray[400]};
  font-size: 14px;
`;

function Skeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonTitle />
      <SkeletonChart />
    </SkeletonWrapper>
  );
}

export default function TransactionLineChart() {
  const { filters } = useFilters();
  const { transactions, loading } = useData();

  const { months, balances, incomes, expenses } = useMemo(() => {
    const filtered = applyFilters(transactions, filters);
    return groupByMonth(filtered);
  }, [transactions, filters]);

  const options: ApexOptions = {
    chart: {
      type: "area",
      fontFamily: "Outfit, sans-serif",
      toolbar: { show: false },
      animations: { enabled: true, speed: 300 },
    },
    colors: [theme.colors.brand[500], theme.colors.success[500], theme.colors.error[500]],
    stroke: { curve: "smooth", width: [2.5, 1.5, 1.5] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.25, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 5 },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "11px", colors: theme.colors.gray[500] } },
    },
    yaxis: {
      labels: {
        style: { fontSize: "11px", colors: [theme.colors.gray[500]] },
        formatter: (val) => (val >= 1000 ? `$${(val / 1000).toFixed(0)}k` : `$${val}`),
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: { colors: theme.colors.gray[500] },
    },
    grid: {
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
      borderColor: theme.colors.gray[100],
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val),
      },
    },
  };

  const series = [
    { name: "Cumulative Balance", data: balances },
    { name: "Revenue", data: incomes },
    { name: "Expenses", data: expenses },
  ];

  return (
    <ChartCard>
      <ChartTitle>Balance Evolution and Monthly Volume</ChartTitle>
      {loading ? (
        <Skeleton />
      ) : months.length === 0 ? (
        <EmptyState>No data for the selected period</EmptyState>
      ) : (
        <ChartScrollWrapper>
          <div style={{ minWidth: `${Math.max(months.length * 55, 360)}px` }}>
            <ReactApexChart options={options} series={series} type="area" height={260} />
          </div>
        </ChartScrollWrapper>
      )}
    </ChartCard>
  );
}
