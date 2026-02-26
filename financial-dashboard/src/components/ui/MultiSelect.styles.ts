import styled from "styled-components";
import { theme } from "@/styles/theme";

// ─── Wrapper ──────────────────────────────────────────────────────────────────
export const Wrapper = styled.div`
  position: relative;
`;

export const FieldLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
`;

// ─── Trigger ──────────────────────────────────────────────────────────────────
interface TriggerButtonProps { $open: boolean }
export const TriggerButton = styled.button<TriggerButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $open }) => ($open ? theme.colors.brand[500] : theme.colors.gray[200])};
  font-size: 14px;
  font-family: ${theme.fonts.outfit};
  background-color: ${theme.colors.white};
  text-align: left;
  transition: border-color 150ms;
  box-shadow: ${({ $open }) => ($open ? `0 0 0 2px ${theme.colors.brand[500]}33` : "none")};

  &:hover {
    border-color: ${({ $open }) => ($open ? theme.colors.brand[500] : theme.colors.gray[300])};
  }
`;

interface TriggerLabelProps { $hasValue: boolean }
export const TriggerLabel = styled.span<TriggerLabelProps>`
  color: ${({ $hasValue }) => ($hasValue ? theme.colors.gray[900] : theme.colors.gray[400])};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface ChevronIconProps { $open: boolean }
export const ChevronIcon = styled.svg<ChevronIconProps>`
  color: ${theme.colors.gray[400]};
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 150ms;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

// ─── Tags ─────────────────────────────────────────────────────────────────────
export const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background-color: ${theme.colors.brand[50]};
  color: ${theme.colors.brand[700]};
  font-size: 12px;
  font-weight: 500;
  border-radius: 999px;
`;

export const TagRemove = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  color: inherit;
  display: flex;
  align-items: center;

  &:hover {
    color: ${theme.colors.brand[900]};
  }
`;

// ─── Dropdown ─────────────────────────────────────────────────────────────────
export const Dropdown = styled.div`
  position: absolute;
  z-index: 50;
  margin-top: 4px;
  width: 100%;
  min-width: 220px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const DropdownSearch = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  position: relative;
`;

export const SearchIconWrapper = styled.svg`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray[400]};
  width: 14px;
  height: 14px;
  pointer-events: none;
`;

export const DropdownSearchInput = styled.input`
  width: 100%;
  padding: 6px 12px 6px 28px;
  font-size: 12px;
  font-family: ${theme.fonts.outfit};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 8px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray[900]};
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px ${theme.colors.brand[500]};
    border-color: ${theme.colors.brand[500]};
  }
`;

export const SelectAllButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.brand[600]};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  transition: background-color 150ms;

  &:hover {
    background-color: ${theme.colors.brand[50]};
  }
`;

// ─── Options List ─────────────────────────────────────────────────────────────
export const OptionsList = styled.div`
  max-height: 208px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.gray[200]} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 999px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[200]};
    border-radius: 999px;
  }
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 150ms;

  &:hover {
    background-color: ${theme.colors.gray[50]};
  }
`;

export const OptionCheckbox = styled.input`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border-color: ${theme.colors.gray[300]};
  accent-color: ${theme.colors.brand[500]};
  cursor: pointer;
`;

export const OptionText = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray[700]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EmptyMessage = styled.p`
  padding: 12px;
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  text-align: center;
  margin: 0;
`;
