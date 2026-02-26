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
  width: 192px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 4px;
`;

const SkeletonBars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 208px;
`;

const SkeletonBar = styled.div<{ $height1: string; $height2: string }>`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;

  &::before {
    content: "";
    display: block;
    background-color: ${theme.colors.gray[100]};
    border-radius: 4px;
    height: ${({ $height1 }) => $height1};
  }

  &::after {
    content: "";
    display: block;
    background-color: ${theme.colors.gray[100]};
    border-radius: 4px;
    height: ${({ $height2 }) => $height2};
    opacity: 0.6;
  }
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
      <SkeletonBars>
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonBar key={i} $height1={`${40 + i * 5}%`} $height2={`${25 + i * 3}%`} />
        ))}
      </SkeletonBars>
    </SkeletonWrapper>
  );
}

export default function StackedBarChart() {
  const { filters } = useFilters();
  const { transactions, loading } = useData();

  const { months, incomes, expenses } = useMemo(() => {
    const filtered = applyFilters(transactions, filters);
    return groupByMonth(filtered);
  }, [transactions, filters]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      stacked: true,
      toolbar: { show: false },
      animations: { enabled: true, speed: 300 },
    },
    colors: [theme.colors.success[500], theme.colors.error[500]],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 3,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
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
    fill: { opacity: 1 },
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
    { name: "Revenue (deposit)", data: incomes },
    { name: "Expenses (withdraw)", data: expenses },
  ];

  return (
    <ChartCard>
      <ChartTitle>Revenue vs Expenses by Month</ChartTitle>
      {loading ? (
        <Skeleton />
      ) : months.length === 0 ? (
        <EmptyState>No data for the selected period</EmptyState>
      ) : (
        <ChartScrollWrapper>
          <div style={{ minWidth: `${Math.max(months.length * 55, 360)}px` }}>
            <ReactApexChart options={options} series={series} type="bar" height={260} />
          </div>
        </ChartScrollWrapper>
      )}
    </ChartCard>
  );
}
