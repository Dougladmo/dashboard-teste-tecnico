import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterProvider, useFilters } from "@/context/FilterContext";

// ── localStorage mock ────────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
beforeEach(() => localStorageMock.clear());

// ── consumer ─────────────────────────────────────────────────────────────────
function FilterConsumer() {
  const { filters, setStartDate, setEndDate, toggleAccount, toggleIndustry, toggleState, resetFilters } = useFilters();
  return (
    <div>
      <p data-testid="startDate">{filters.startDate}</p>
      <p data-testid="endDate">{filters.endDate}</p>
      <p data-testid="accounts">{filters.accounts.join(",")}</p>
      <p data-testid="industries">{filters.industries.join(",")}</p>
      <p data-testid="states">{filters.states.join(",")}</p>
      <button onClick={() => setStartDate("2023-01-01")} data-testid="setStart">Set start</button>
      <button onClick={() => setEndDate("2023-12-31")} data-testid="setEnd">Set end</button>
      <button onClick={() => toggleAccount("Acme Corp")} data-testid="toggleAccount">Toggle account</button>
      <button onClick={() => toggleIndustry("Technology")} data-testid="toggleIndustry">Toggle industry</button>
      <button onClick={() => toggleState("CA")} data-testid="toggleState">Toggle state</button>
      <button onClick={resetFilters} data-testid="reset">Reset</button>
    </div>
  );
}

function wrap() {
  return render(<FilterProvider><FilterConsumer /></FilterProvider>);
}

// ── tests ────────────────────────────────────────────────────────────────────
describe("FilterContext", () => {
  it("initialises with empty/default values", () => {
    wrap();
    expect(screen.getByTestId("startDate").textContent).toBe("");
    expect(screen.getByTestId("endDate").textContent).toBe("");
    expect(screen.getByTestId("accounts").textContent).toBe("");
    expect(screen.getByTestId("industries").textContent).toBe("");
    expect(screen.getByTestId("states").textContent).toBe("");
  });

  it("updates startDate and persists to localStorage", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("setStart"));

    expect(screen.getByTestId("startDate").textContent).toBe("2023-01-01");
    const stored = JSON.parse(localStorage.getItem("dashboard_filters")!);
    expect(stored.startDate).toBe("2023-01-01");
  });

  it("updates endDate", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("setEnd"));
    expect(screen.getByTestId("endDate").textContent).toBe("2023-12-31");
  });

  it("toggleAccount adds account when not present", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("toggleAccount"));
    expect(screen.getByTestId("accounts").textContent).toBe("Acme Corp");
  });

  it("toggleAccount removes account when already present", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("toggleAccount")); // add
    await user.click(screen.getByTestId("toggleAccount")); // remove
    expect(screen.getByTestId("accounts").textContent).toBe("");
  });

  it("toggleIndustry adds and removes correctly", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("toggleIndustry"));
    expect(screen.getByTestId("industries").textContent).toBe("Technology");

    await user.click(screen.getByTestId("toggleIndustry"));
    expect(screen.getByTestId("industries").textContent).toBe("");
  });

  it("toggleState adds and removes correctly", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("toggleState"));
    expect(screen.getByTestId("states").textContent).toBe("CA");

    await user.click(screen.getByTestId("toggleState"));
    expect(screen.getByTestId("states").textContent).toBe("");
  });

  it("resetFilters clears all selections", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("setStart"));
    await user.click(screen.getByTestId("toggleAccount"));
    await user.click(screen.getByTestId("toggleState"));
    await user.click(screen.getByTestId("reset"));

    expect(screen.getByTestId("startDate").textContent).toBe("");
    expect(screen.getByTestId("accounts").textContent).toBe("");
    expect(screen.getByTestId("states").textContent).toBe("");
  });

  it("restores filters from localStorage on mount", () => {
    localStorage.setItem(
      "dashboard_filters",
      JSON.stringify({ startDate: "2022-06-01", endDate: "2022-12-31", accounts: ["Beta Inc"], industries: [], states: ["TX"] })
    );

    wrap();

    expect(screen.getByTestId("startDate").textContent).toBe("2022-06-01");
    expect(screen.getByTestId("endDate").textContent).toBe("2022-12-31");
    expect(screen.getByTestId("accounts").textContent).toBe("Beta Inc");
    expect(screen.getByTestId("states").textContent).toBe("TX");
  });

  it("persists all filter state to localStorage when toggling", async () => {
    const user = userEvent.setup();
    wrap();

    await user.click(screen.getByTestId("toggleAccount"));
    await user.click(screen.getByTestId("toggleIndustry"));
    await user.click(screen.getByTestId("toggleState"));

    const stored = JSON.parse(localStorage.getItem("dashboard_filters")!);
    expect(stored.accounts).toContain("Acme Corp");
    expect(stored.industries).toContain("Technology");
    expect(stored.states).toContain("CA");
  });
});
