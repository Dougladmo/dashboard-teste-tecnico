"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Overlay,
  SidebarAside,
  LogoArea,
  LogoIcon,
  LogoText,
  Nav,
  NavLink,
  NavIconSpan,
  Footer,
  UserCard,
  UserName,
  UserEmail,
  FooterButton,
} from "./Sidebar.styles";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isExpanded: boolean;
}

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
