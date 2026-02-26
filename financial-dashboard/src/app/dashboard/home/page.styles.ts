import styled from "styled-components";
import Link from "next/link";
import { theme } from "@/styles/theme";

// ─── Page ─────────────────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HeroSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.brand[500]} 0%, ${theme.colors.brand[700]} 100%);
  border-radius: 16px;
  padding: 40px 32px;
  color: ${theme.colors.white};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 48px 40px;
  }
`;

export const HeroGreeting = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.brand[200]};
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0 0 12px 0;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 28px 0;
  max-width: 520px;
  line-height: 1.6;
`;

export const HeroButton = styled(Link)`
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

// ─── Section ──────────────────────────────────────────────────────────────────
export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0 0 16px 0;
`;

// ─── Feature Cards ────────────────────────────────────────────────────────────
export const CardsGrid = styled.div`
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

export const FeatureCard = styled(Link)`
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

interface CardIconWrapperProps { $color: string; $bg: string }
export const CardIconWrapper = styled.div<CardIconWrapperProps>`
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

export const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: 13px;
  color: ${theme.colors.gray[500]};
  margin: 0;
  line-height: 1.5;
`;

export const CardArrow = styled.span`
  margin-top: auto;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.brand[500]};
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ─── Info Grid ────────────────────────────────────────────────────────────────
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoCard = styled.div`
  padding: 20px 24px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 12px;
`;

export const InfoCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.li`
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
