"use client";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled, { createGlobalStyle } from "styled-components";
import { theme } from "@/styles/theme";
import type { ReactNode } from "react";

const DatePickerGlobal = createGlobalStyle`
  .react-datepicker {
    font-family: ${theme.fonts.outfit};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 12px;
    box-shadow: ${theme.shadows.md};
    overflow: hidden;
  }
  .react-datepicker__header {
    background-color: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.gray[100]};
    padding: 12px 0 8px;
  }
  .react-datepicker__current-month {
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.gray[800]};
  }
  .react-datepicker__navigation-icon::before {
    border-color: ${theme.colors.gray[400]};
  }
  .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
    border-color: ${theme.colors.brand[500]};
  }
  .react-datepicker__day-name {
    font-size: 11px;
    font-weight: 600;
    color: ${theme.colors.gray[400]};
    text-transform: uppercase;
  }
  .react-datepicker__day {
    font-size: 13px;
    color: ${theme.colors.gray[700]};
    border-radius: 6px;
    transition: background-color 120ms, color 120ms;
  }
  .react-datepicker__day:hover {
    background-color: ${theme.colors.brand[50]};
    color: ${theme.colors.brand[700]};
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: ${theme.colors.brand[500]} !important;
    color: ${theme.colors.white} !important;
    border-radius: 6px !important;
  }
  .react-datepicker__day--in-range {
    background-color: ${theme.colors.brand[50]};
    color: ${theme.colors.brand[700]};
    border-radius: 0;
  }
  .react-datepicker__day--in-selecting-range {
    background-color: ${theme.colors.brand[100]};
    color: ${theme.colors.brand[700]};
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${theme.colors.brand[100]};
    color: ${theme.colors.brand[700]};
  }
  .react-datepicker__day--disabled {
    color: ${theme.colors.gray[300]};
    cursor: not-allowed;
  }
  .react-datepicker__day--outside-month {
    color: ${theme.colors.gray[300]};
  }
  .react-datepicker__triangle {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[200]};
  font-size: 14px;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.fonts.outfit};
  background-color: ${theme.colors.white};
  transition: border-color 150ms, box-shadow 150ms;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px ${theme.colors.brand[500]};
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;

  .react-datepicker__month-container {
    float: none;
  }
`;

const Presets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  background-color: ${theme.colors.white};
`;

const PresetBtn = styled.button<{ $active?: boolean }>`
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  font-family: ${theme.fonts.outfit};
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.brand[500] : theme.colors.gray[200])};
  background-color: ${({ $active }) => ($active ? theme.colors.brand[50] : theme.colors.white)};
  color: ${({ $active }) => ($active ? theme.colors.brand[700] : theme.colors.gray[600])};
  cursor: pointer;
  transition: all 120ms;

  &:hover {
    border-color: ${theme.colors.brand[400]};
    background-color: ${theme.colors.brand[50]};
    color: ${theme.colors.brand[700]};
  }
`;

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  minDate?: string;
  maxDate?: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
}

function toDate(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function toStr(date: Date | null): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(start: Date | null, end: Date | null): string {
  if (!start && !end) return "";
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (start && end) return `${fmt(start)} – ${fmt(end)}`;
  if (start) return `From ${fmt(start)}`;
  return `Until ${fmt(end!)}`;
}

function subMonths(base: Date, months: number): Date {
  const d = new Date(base);
  d.setMonth(d.getMonth() - months);
  return d;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export default function DateRangePicker({
  startDate,
  endDate,
  minDate,
  maxDate,
  onStartChange,
  onEndChange,
}: DateRangePickerProps) {
  const start = toDate(startDate);
  const end = toDate(endDate);
  const min = toDate(minDate || "");
  const max = toDate(maxDate || "");

  // Use maxDate from data as "today" reference for presets
  const reference = max ?? new Date();

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [s, e] = dates;
    onStartChange(toStr(s));
    onEndChange(toStr(e));
  };

  const applyPreset = (s: Date | null, e: Date | null) => {
    onStartChange(toStr(s));
    onEndChange(toStr(e));
  };

  const presets = [
    { label: "All", start: null, end: null },
    {
      label: "Last month",
      start: startOfMonth(subMonths(reference, 1)),
      end: endOfMonth(subMonths(reference, 1)),
    },
    { label: "3 months", start: subMonths(reference, 3), end: reference },
    { label: "6 months", start: subMonths(reference, 6), end: reference },
    { label: "12 months", start: subMonths(reference, 12), end: reference },
  ];

  function isActivePreset(ps: typeof presets[number]) {
    if (!ps.start && !ps.end) return !startDate && !endDate;
    return toStr(ps.start) === startDate && toStr(ps.end) === endDate;
  }

  const CalendarWrapper = ({ children }: { children: ReactNode }) => (
    <CalendarContainer>
      <Presets>
        {presets.map((p) => (
          <PresetBtn
            key={p.label}
            $active={isActivePreset(p)}
            onMouseDown={(e) => {
              e.preventDefault();
              applyPreset(p.start, p.end);
            }}
          >
            {p.label}
          </PresetBtn>
        ))}
      </Presets>
      {children}
    </CalendarContainer>
  );

  return (
    <Wrapper>
      <DatePickerGlobal />
      <ReactDatePicker
        selectsRange
        startDate={start ?? undefined}
        endDate={end ?? undefined}
        minDate={min ?? undefined}
        maxDate={max ?? undefined}
        onChange={handleChange}
        placeholderText="All period"
        customInput={<StyledInput readOnly value={formatDisplay(start, end)} />}
        calendarContainer={CalendarWrapper}
        popperPlacement="bottom-start"
        showPopperArrow={false}
      />
    </Wrapper>
  );
}
