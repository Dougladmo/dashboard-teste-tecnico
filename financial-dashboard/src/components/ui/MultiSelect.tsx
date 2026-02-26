"use client";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const Wrapper = styled.div`
  position: relative;
`;

const FieldLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
`;

const TriggerButton = styled.button<{ $open: boolean }>`
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

const TriggerLabel = styled.span<{ $hasValue: boolean }>`
  color: ${({ $hasValue }) => ($hasValue ? theme.colors.gray[900] : theme.colors.gray[400])};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChevronIcon = styled.svg<{ $open: boolean }>`
  color: ${theme.colors.gray[400]};
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 150ms;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const Tag = styled.span`
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

const TagRemove = styled.button`
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

const Dropdown = styled.div`
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

const DropdownSearch = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  position: relative;
`;

const SearchIconWrapper = styled.svg`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray[400]};
  width: 14px;
  height: 14px;
  pointer-events: none;
`;

const DropdownSearchInput = styled.input`
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

const SelectAllButton = styled.button`
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

const OptionsList = styled.div`
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

const OptionLabel = styled.label`
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

const OptionCheckbox = styled.input`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border-color: ${theme.colors.gray[300]};
  accent-color: ${theme.colors.brand[500]};
  cursor: pointer;
`;

const OptionText = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray[700]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmptyMessage = styled.p`
  padding: 12px;
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  text-align: center;
  margin: 0;
`;

export default function MultiSelect({ label, options, selected, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  function toggle(item: string) {
    const next = selected.includes(item)
      ? selected.filter((x) => x !== item)
      : [...selected, item];
    onChange(next);
  }

  function toggleAll() {
    const allFilteredSelected = filtered.every((f) => selected.includes(f));
    onChange(
      allFilteredSelected
        ? selected.filter((s) => !filtered.includes(s))
        : [...new Set([...selected, ...filtered])]
    );
  }

  const count = selected.length;
  const allFilteredSelected = filtered.length > 0 && filtered.every((f) => selected.includes(f));

  return (
    <Wrapper ref={ref}>
      <FieldLabel>{label}</FieldLabel>

      <TriggerButton type="button" onClick={() => setOpen((p) => !p)} $open={open}>
        <TriggerLabel $hasValue={count > 0}>
          {count > 0 ? `${count} selected` : (placeholder ?? "All")}
        </TriggerLabel>
        <ChevronIcon $open={open} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </ChevronIcon>
      </TriggerButton>

      {count > 0 && (
        <TagsRow>
          {selected.map((s) => (
            <Tag key={s}>
              {s}
              <TagRemove type="button" onClick={() => toggle(s)}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </TagRemove>
            </Tag>
          ))}
        </TagsRow>
      )}

      {open && (
        <Dropdown>
          <DropdownSearch>
            <SearchIconWrapper viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </SearchIconWrapper>
            <DropdownSearchInput
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </DropdownSearch>

          {filtered.length > 0 && (
            <SelectAllButton type="button" onClick={toggleAll}>
              {allFilteredSelected ? "Deselect all" : "Select all"}
            </SelectAllButton>
          )}

          <OptionsList>
            {filtered.length === 0 ? (
              <EmptyMessage>No results</EmptyMessage>
            ) : (
              filtered.map((opt) => (
                <OptionLabel key={opt}>
                  <OptionCheckbox
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                  <OptionText>{opt}</OptionText>
                </OptionLabel>
              ))
            )}
          </OptionsList>
        </Dropdown>
      )}
    </Wrapper>
  );
}
