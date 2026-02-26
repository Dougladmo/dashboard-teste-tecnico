"use client";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createContext, useContext, useMemo, useCallback, type ReactNode } from "react";
import {
  DatePickerGlobal,
  Wrapper,
  StyledInput,
  PresetsBar,
  PresetBtn,
} from "./DateRangePicker.styles";

/* ─── preset context (keeps CalendarContainer stable across re-renders) ──── */

interface PresetItem {
  label: string;
  start: Date | null;
  end: Date | null;
}

interface PresetsCtxValue {
  presets: PresetItem[];
  isActive: (p: PresetItem) => boolean;
  apply: (s: Date | null, e: Date | null) => void;
}

const PresetsCtx = createContext<PresetsCtxValue>({
  presets: [],
  isActive: () => false,
  apply: () => {},
});

// Defined at module level → stable reference → no remount on re-render
function CalendarContainer({ className, children }: { className?: string; children: ReactNode }) {
  const { presets, isActive, apply } = useContext(PresetsCtx);
  return (
    <div className={className} style={{ borderRadius: 12, overflow: "hidden" }}>
      <PresetsBar>
        {presets.map((p) => (
          <PresetBtn
            key={p.label}
            $active={isActive(p)}
            onMouseDown={(e) => {
              e.preventDefault();
              apply(p.start, p.end);
            }}
          >
            {p.label}
          </PresetBtn>
        ))}
      </PresetsBar>
      {children}
    </div>
  );
}

/* ─── helpers ────────────────────────────────────────────────────────────── */

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

/* ─── main component ─────────────────────────────────────────────────────── */

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  minDate?: string;
  maxDate?: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
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
  const reference = max ?? new Date();

  const apply = useCallback(
    (s: Date | null, e: Date | null) => {
      onStartChange(toStr(s));
      onEndChange(toStr(e));
    },
    [onStartChange, onEndChange]
  );

  const presets = useMemo<PresetItem[]>(
    () => [
      { label: "All", start: null, end: null },
      {
        label: "Last month",
        start: startOfMonth(subMonths(reference, 1)),
        end: endOfMonth(subMonths(reference, 1)),
      },
      { label: "3 months", start: subMonths(reference, 3), end: reference },
      { label: "6 months", start: subMonths(reference, 6), end: reference },
      { label: "12 months", start: subMonths(reference, 12), end: reference },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxDate]
  );

  const isActive = useCallback(
    (p: PresetItem) => {
      if (!p.start && !p.end) return !startDate && !endDate;
      return toStr(p.start) === startDate && toStr(p.end) === endDate;
    },
    [startDate, endDate]
  );

  const handleChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      apply(dates[0], dates[1]);
    },
    [apply]
  );

  return (
    <PresetsCtx.Provider value={{ presets, isActive, apply }}>
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
          calendarContainer={CalendarContainer}
          popperPlacement="bottom-start"
          showPopperArrow={false}
          popperProps={{ style: { zIndex: 100 } }}
        />
      </Wrapper>
    </PresetsCtx.Provider>
  );
}
