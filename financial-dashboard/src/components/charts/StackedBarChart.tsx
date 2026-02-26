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
  SkeletonBars,
  SkeletonBar,
  ChartScrollWrapper,
  EmptyState,
} from "./StackedBarChart.styles";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
