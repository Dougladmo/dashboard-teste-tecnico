import styled, { createGlobalStyle } from "styled-components";
import { theme } from "@/styles/theme";

// ─── Global Calendar Overrides ────────────────────────────────────────────────
export const DatePickerGlobal = createGlobalStyle`
  .react-datepicker {
    font-family: ${theme.fonts.outfit};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 12px;
    box-shadow: ${theme.shadows.md};
    overflow: visible;
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
  .react-datepicker__navigation {
    top: calc(100% - 6px + 44px);
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

// ─── Wrapper ──────────────────────────────────────────────────────────────────
export const Wrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }
`;

// ─── Input ────────────────────────────────────────────────────────────────────
export const StyledInput = styled.input`
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

// ─── Presets ──────────────────────────────────────────────────────────────────
export const PresetsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  background-color: ${theme.colors.white};
  border-radius: 12px 12px 0 0;
`;

interface PresetBtnProps { $active?: boolean }
export const PresetBtn = styled.button<PresetBtnProps>`
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
