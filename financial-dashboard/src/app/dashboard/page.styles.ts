import styled from "styled-components";
import { theme } from "@/styles/theme";

// ─── Page ─────────────────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1536px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  margin: 4px 0 0 0;
`;

// ─── Charts Grid ──────────────────────────────────────────────────────────────
export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;
