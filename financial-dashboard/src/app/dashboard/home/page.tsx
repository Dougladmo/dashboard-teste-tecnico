"use client";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useAuth } from "@/context/AuthContext";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.brand[500]} 0%, ${theme.colors.brand[700]} 100%);
  border-radius: 16px;
  padding: 40px 32px;
  color: ${theme.colors.white};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 48px 40px;
  }
`;

const HeroGreeting = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.brand[200]};
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0 0 12px 0;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 28px 0;
  max-width: 520px;
  line-height: 1.6;
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.brand[600]};
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 150ms, transform 150ms;

  &:hover {
    background-color: ${theme.colors.brand[50]};
    transform: translateY(-1px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0 0 16px 0;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 12px;
  text-decoration: none;
  transition: box-shadow 200ms, border-color 200ms, transform 200ms;

  &:hover {
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.brand[200]};
    transform: translateY(-2px);
  }
`;

const CardIconWrapper = styled.div<{ $color: string; $bg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 13px;
  color: ${theme.colors.gray[500]};
  margin: 0;
  line-height: 1.5;
`;

const CardArrow = styled.span`
  margin-top: auto;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.brand[500]};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoCard = styled.div`
  padding: 20px 24px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 12px;
`;

const InfoCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.li`
  font-size: 13px;
  color: ${theme.colors.gray[500]};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${theme.colors.brand[400]};
    flex-shrink: 0;
  }
`;

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
