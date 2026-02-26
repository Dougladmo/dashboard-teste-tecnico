import styled from "styled-components";
import { theme } from "@/styles/theme";

// ─── Root ─────────────────────────────────────────────────────────────────────
export const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
`;

// ─── Content ──────────────────────────────────────────────────────────────────
interface ContentWrapperProps { $sidebarWidth: string }
export const ContentWrapper = styled.div<ContentWrapperProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: margin-left 300ms ease-in-out;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-left: ${({ $sidebarWidth }) => $sidebarWidth};
  }
`;

// ─── Header ───────────────────────────────────────────────────────────────────
export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 56px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  position: sticky;
  top: 0;
  z-index: 30;
  flex-shrink: 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 24px;
  }
`;

export const SidebarToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: ${theme.colors.gray[600]};
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[900]};
  }
`;

export const HeaderBrand = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${theme.colors.gray[900]};

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

// ─── Main ─────────────────────────────────────────────────────────────────────
export const Main = styled.main`
  flex: 1;
  padding: 16px;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 24px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 32px;
  }
`;
