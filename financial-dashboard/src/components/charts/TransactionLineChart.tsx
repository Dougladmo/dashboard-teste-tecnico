"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import { applyFilters, groupByMonth } from "@/lib/filterUtils";
import { theme } from "@/styles/theme";
import {
  ChartCard,
  ChartTitle,
  SkeletonWrapper,
  SkeletonTitle,
  SkeletonChart,
  ChartScrollWrapper,
  EmptyState,
} from "./TransactionLineChart.styles";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
