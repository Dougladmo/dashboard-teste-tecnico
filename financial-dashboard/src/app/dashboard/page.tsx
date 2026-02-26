import MetricsCards from "@/components/dashboard/MetricsCards";
import FiltersPanel from "@/components/dashboard/FiltersPanel";
import StackedBarChart from "@/components/charts/StackedBarChart";
import TransactionLineChart from "@/components/charts/TransactionLineChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1536px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  margin: 4px 0 0 0;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

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
