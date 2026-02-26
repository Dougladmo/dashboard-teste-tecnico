"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
`;

const ContentWrapper = styled.div<{ $sidebarWidth: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: margin-left 300ms ease-in-out;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-left: ${({ $sidebarWidth }) => $sidebarWidth};
  }
`;

const Header = styled.header`
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

const SidebarToggleButton = styled.button`
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

const HeaderBrand = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${theme.colors.gray[900]};

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 16px;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 24px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 32px;
  }
`;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const check = () => {
      if (window.innerWidth < 768) setIsExpanded(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileOpen((p) => !p);
    } else {
      setIsExpanded((p) => !p);
    }
  };

  const sidebarWidth = isMounted ? (isExpanded ? "240px" : "72px") : "240px";

  return (
    <LayoutRoot>
      <Sidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        isExpanded={isExpanded}
      />

      <ContentWrapper $sidebarWidth={sidebarWidth}>
        <Header>
          <SidebarToggleButton onClick={handleToggle} title="Toggle sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </SidebarToggleButton>
          <HeaderBrand>FinDash</HeaderBrand>
        </Header>

        <Main>
          {children}
        </Main>
      </ContentWrapper>
    </LayoutRoot>
  );
}
