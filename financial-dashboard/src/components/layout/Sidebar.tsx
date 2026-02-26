"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isExpanded: boolean;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const SidebarAside = styled.aside<{
  $width: string;
  $translateX: string;
}>`
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

const LogoArea = styled.div<{ $centered: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  justify-content: ${({ $centered }) => ($centered ? "center" : "flex-start")};
  height: 56px;
  box-sizing: border-box;
`;

const LogoIcon = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.brand[500]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  font-size: 14px;
  white-space: nowrap;
`;

const Nav = styled.nav`
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

const NavLink = styled(Link)<{ $active: boolean; $centered: boolean }>`
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

const NavIconSpan = styled.span<{ $active: boolean }>`
  flex-shrink: 0;
  color: ${({ $active }) => ($active ? theme.colors.brand[500] : theme.colors.gray[400])};

  ${NavLink}:hover & {
    color: ${theme.colors.gray[600]};
  }
`;

const Footer = styled.div`
  padding: 16px 12px;
  border-top: 1px solid ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserCard = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${theme.colors.gray[50]};
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.gray[900]};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserEmail = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FooterButton = styled.button<{ $centered: boolean; $variant?: "danger" }>`
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

export default function Sidebar({ isMobileOpen, onMobileClose, isExpanded }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const showLabels = isExpanded || isHovered || isMobileOpen;
  const sidebarWidth = isMobile ? "260px" : isExpanded || isHovered ? "240px" : "72px";
  const translateX = isMobile ? (isMobileOpen ? "0" : "-100%") : "0";

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  const navItems = [
    {
      href: "/dashboard/home",
      label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      exactMatch: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {isMobileOpen && <Overlay onClick={onMobileClose} />}

      <SidebarAside
        $width={sidebarWidth}
        $translateX={translateX}
        onMouseEnter={() => !isExpanded && !isMobile && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <LogoArea $centered={!showLabels}>
          <LogoIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </LogoIcon>
          {showLabels && <LogoText>FinDash</LogoText>}
        </LogoArea>

        <Nav>
          {navItems.map((item) => {
            const active = item.exactMatch
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                href={item.href}
                $active={active}
                $centered={!showLabels}
                onClick={isMobile ? onMobileClose : undefined}
                title={!showLabels ? item.label : undefined}
              >
                <NavIconSpan $active={active}>{item.icon}</NavIconSpan>
                {showLabels && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </Nav>

        <Footer>
          {showLabels && user && (
            <UserCard>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserCard>
          )}

          <FooterButton
            onClick={handleLogout}
            $centered={!showLabels}
            $variant="danger"
            title={!showLabels ? "Logout" : undefined}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {showLabels && <span>Logout</span>}
          </FooterButton>
        </Footer>
      </SidebarAside>
    </>
  );
}
