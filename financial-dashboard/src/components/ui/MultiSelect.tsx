"use client";
import { useState, useRef, useEffect } from "react";
import {
  Wrapper,
  FieldLabel,
  TriggerButton,
  TriggerLabel,
  ChevronIcon,
  TagsRow,
  Tag,
  TagRemove,
  Dropdown,
  DropdownSearch,
  SearchIconWrapper,
  DropdownSearchInput,
  SelectAllButton,
  OptionsList,
  OptionLabel,
  OptionCheckbox,
  OptionText,
  EmptyMessage,
} from "./MultiSelect.styles";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

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
