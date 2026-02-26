"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import {
  LayoutRoot,
  ContentWrapper,
  Header,
  SidebarToggleButton,
  HeaderBrand,
  Main,
} from "./layout.styles";

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
