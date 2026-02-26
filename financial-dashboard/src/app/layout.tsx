import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/components/Providers";
import { AuthProvider } from "@/context/AuthContext";
import { FilterProvider } from "@/context/FilterContext";
import { DataProvider } from "@/context/DataContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Financial Dashboard",
  description: "Financial dashboard with analysis of revenue, expenses and transactions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <StyledComponentsRegistry>
          <Providers>
            <AuthProvider>
              <DataProvider>
                <FilterProvider>
                  {children}
                </FilterProvider>
              </DataProvider>
            </AuthProvider>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
