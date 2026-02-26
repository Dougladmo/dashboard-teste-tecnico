import styled, { css } from "styled-components";
import Link from "next/link";
import { theme } from "@/styles/theme";

// ─── Overlay ──────────────────────────────────────────────────────────────────
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

// ─── Sidebar Shell ────────────────────────────────────────────────────────────
interface SidebarAsideProps { $width: string; $translateX: string }
export const SidebarAside = styled.aside<SidebarAsideProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray[200]};
  display: flex;
  flex-direction: column;
  transition: all 300ms ease-in-out;
  z-index: 50;
  width: ${({ $width }) => $width};
  transform: translateX(${({ $translateX }) => $translateX});
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
interface LogoAreaProps { $centered: boolean }
export const LogoArea = styled.div<LogoAreaProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  justify-content: ${({ $centered }) => ($centered ? "center" : "flex-start")};
  height: 56px;
  box-sizing: border-box;
`;

export const LogoIcon = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.brand[500]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.span`
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  font-size: 14px;
  white-space: nowrap;
`;

// ─── Nav ──────────────────────────────────────────────────────────────────────
export const Nav = styled.nav`
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface NavLinkProps { $active: boolean; $centered: boolean }
export const NavLink = styled(Link)<NavLinkProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 150ms, color 150ms;
  justify-content: ${({ $centered }) => ($centered ? "center" : "flex-start")};

  ${({ $active }) =>
    $active
      ? css`
          background-color: ${theme.colors.brand[50]};
          color: ${theme.colors.brand[600]};
        `
      : css`
          color: ${theme.colors.gray[600]};
          &:hover {
            background-color: ${theme.colors.gray[100]};
            color: ${theme.colors.gray[900]};
          }
        `}
`;

interface NavIconSpanProps { $active: boolean }
export const NavIconSpan = styled.span<NavIconSpanProps>`
  flex-shrink: 0;
  color: ${({ $active }) => ($active ? theme.colors.brand[500] : theme.colors.gray[400])};

  ${NavLink}:hover & {
    color: ${theme.colors.gray[600]};
  }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────
export const Footer = styled.div`
  padding: 16px 12px;
  border-top: 1px solid ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UserCard = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${theme.colors.gray[50]};
`;

export const UserName = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.gray[900]};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface FooterButtonProps { $centered: boolean; $variant?: "danger" }
export const FooterButton = styled.button<FooterButtonProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 150ms, color 150ms;
  justify-content: ${({ $centered }) => ($centered ? "center" : "flex-start")};

  ${({ $variant }) =>
    $variant === "danger"
      ? css`
          color: ${theme.colors.error[600]};
          &:hover {
            background-color: ${theme.colors.error[50]};
          }
        `
      : css`
          color: ${theme.colors.gray[600]};
          &:hover {
            background-color: ${theme.colors.gray[100]};
            color: ${theme.colors.gray[900]};
          }
        `}
`;
