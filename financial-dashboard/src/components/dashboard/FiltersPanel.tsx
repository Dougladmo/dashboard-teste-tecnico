"use client";
import { useFilters } from "@/context/FilterContext";
import { useData } from "@/context/DataContext";
import MultiSelect from "@/components/ui/MultiSelect";
import DateRangePicker from "@/components/ui/DateRangePicker";
import {
  PanelCard,
  PanelHeader,
  HeaderLeft,
  FilterIcon,
  PanelTitle,
  ActiveBadge,
  ClearButton,
  FiltersGrid,
  SkeletonBlock,
  FieldLabel,
} from "./FiltersPanel.styles";

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
