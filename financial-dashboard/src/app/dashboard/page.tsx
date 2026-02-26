import MetricsCards from "@/components/dashboard/MetricsCards";
import FiltersPanel from "@/components/dashboard/FiltersPanel";
import StackedBarChart from "@/components/charts/StackedBarChart";
import TransactionLineChart from "@/components/charts/TransactionLineChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  ChartsGrid,
} from "./page.styles";

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div>
        <PageTitle>Financial Dashboard</PageTitle>
        <PageSubtitle>Complete overview of revenue, expenses and transactions</PageSubtitle>
      </div>

      <FiltersPanel />
      <MetricsCards />

      <ChartsGrid>
        <StackedBarChart />
        <TransactionLineChart />
      </ChartsGrid>

      <TransactionsTable />
    </PageWrapper>
  );
}
