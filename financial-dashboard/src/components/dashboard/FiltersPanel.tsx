"use client";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import MultiSelect from "@/components/ui/MultiSelect";
import DateRangePicker from "@/components/ui/DateRangePicker";
import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const PanelCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[100]};
  box-shadow: ${theme.shadows.xs};
  padding: 20px;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterIcon = styled.svg`
  color: ${theme.colors.gray[500]};
`;

const PanelTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

const ActiveBadge = styled.span`
  padding: 2px 8px;
  background-color: ${theme.colors.brand[50]};
  color: ${theme.colors.brand[600]};
  font-size: 12px;
  font-weight: 500;
  border-radius: 999px;
`;

const ClearButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.error[600]};
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 150ms;

  &:hover {
    color: ${theme.colors.error[700]};
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const SkeletonBlock = styled.div`
  height: 64px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 8px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const FieldLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
`;

export default function FiltersPanel() {
  const { filters, setStartDate, setEndDate, setAccounts, setIndustries, setStates, resetFilters } = useFilters();
  const { accounts, industries, states, minDate, maxDate, loading } = useData();

  const hasActiveFilters =
    filters.accounts.length > 0 ||
    filters.industries.length > 0 ||
    filters.states.length > 0 ||
    !!filters.startDate ||
    !!filters.endDate;

  return (
    <PanelCard>
      <PanelHeader>
        <HeaderLeft>
          <FilterIcon
            as="svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </FilterIcon>
          <PanelTitle>Filters</PanelTitle>
          {hasActiveFilters && <ActiveBadge>Active</ActiveBadge>}
        </HeaderLeft>
        {hasActiveFilters && (
          <ClearButton onClick={resetFilters}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear filters
          </ClearButton>
        )}
      </PanelHeader>

      {loading ? (
        <FiltersGrid>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock key={i} />
          ))}
        </FiltersGrid>
      ) : (
        <FiltersGrid>
          <div>
            <FieldLabel>Date</FieldLabel>
            <DateRangePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
              minDate={minDate}
              maxDate={maxDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
            />
          </div>

          <MultiSelect
            label="Company"
            options={accounts}
            selected={filters.accounts}
            onChange={setAccounts}
            placeholder="All companies"
          />

          <MultiSelect
            label="Industry"
            options={industries}
            selected={filters.industries}
            onChange={setIndustries}
            placeholder="All industries"
          />

          <MultiSelect
            label="State"
            options={states}
            selected={filters.states}
            onChange={setStates}
            placeholder="All states"
          />
        </FiltersGrid>
      )}
    </PanelCard>
  );
}
