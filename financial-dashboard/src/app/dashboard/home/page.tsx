"use client";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/styles/theme";
import {
  PageWrapper,
  HeroSection,
  HeroGreeting,
  HeroTitle,
  HeroSubtitle,
  HeroButton,
  SectionTitle,
  CardsGrid,
  FeatureCard,
  CardIconWrapper,
  CardTitle,
  CardDescription,
  CardArrow,
  InfoGrid,
  InfoCard,
  InfoCardTitle,
  InfoList,
  InfoItem,
} from "./page.styles";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <PageWrapper>
      <HeroSection>
        <HeroGreeting>Financial Dashboard</HeroGreeting>
        <HeroTitle>Welcome back, {user?.name ?? "User"}!</HeroTitle>
        <HeroSubtitle>
          Analyze your financial data, track revenues and expenses, and gain insights from
          transaction history — all in one place.
        </HeroSubtitle>
        <HeroButton href="/dashboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Go to Dashboard
        </HeroButton>
      </HeroSection>

      <div>
        <SectionTitle>What you can do</SectionTitle>
        <CardsGrid>
          <FeatureCard href="/dashboard">
            <CardIconWrapper $color={theme.colors.brand[500]} $bg={theme.colors.brand[50]}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </CardIconWrapper>
            <CardTitle>Revenue & Expenses</CardTitle>
            <CardDescription>
              View stacked bar charts comparing monthly revenue and expenses over time.
            </CardDescription>
            <CardArrow>
              View charts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </CardArrow>
          </FeatureCard>

          <FeatureCard href="/dashboard">
            <CardIconWrapper $color={theme.colors.success[600]} $bg={theme.colors.success[50]}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </CardIconWrapper>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Browse and filter 50,000+ transactions by date, company, industry, and state.
            </CardDescription>
            <CardArrow>
              View transactions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </CardArrow>
          </FeatureCard>

          <FeatureCard href="/dashboard">
            <CardIconWrapper $color={theme.colors.warning[500]} $bg={theme.colors.warning[50]}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </CardIconWrapper>
            <CardTitle>Balance Overview</CardTitle>
            <CardDescription>
              Track your cumulative balance evolution and monthly financial performance.
            </CardDescription>
            <CardArrow>
              View balance
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </CardArrow>
          </FeatureCard>
        </CardsGrid>
      </div>

      <InfoGrid>
        <InfoCard>
          <InfoCardTitle>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.colors.brand[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Dashboard Features
          </InfoCardTitle>
          <InfoList>
            <InfoItem>Global filters: date range, company, industry, state</InfoItem>
            <InfoItem>Summary cards for revenue, expenses and net balance</InfoItem>
            <InfoItem>Stacked bar chart — monthly revenue vs expenses</InfoItem>
            <InfoItem>Line chart — cumulative balance evolution</InfoItem>
            <InfoItem>Searchable and paginated transactions table</InfoItem>
          </InfoList>
        </InfoCard>

        <InfoCard>
          <InfoCardTitle>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.colors.success[600]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Quick Start
          </InfoCardTitle>
          <InfoList>
            <InfoItem>Use the sidebar to navigate between pages</InfoItem>
            <InfoItem>Apply filters to update all charts and metrics in real time</InfoItem>
            <InfoItem>Filters are persisted across page refreshes</InfoItem>
            <InfoItem>Click the header button to toggle the sidebar</InfoItem>
            <InfoItem>Use logout to end your session securely</InfoItem>
          </InfoList>
        </InfoCard>
      </InfoGrid>
    </PageWrapper>
  );
}
