import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// ── helpers ──────────────────────────────────────────────────────────────────

/** A minimal component that exposes auth state for assertions */
function AuthConsumer() {
  const { isAuthenticated, user, login, logout } = useAuth();
  return (
    <div>
      <p data-testid="status">{isAuthenticated ? "authenticated" : "unauthenticated"}</p>
      <p data-testid="email">{user?.email ?? "none"}</p>
      <button onClick={() => login("admin@dashboard.com", "admin123")} data-testid="btn-login-valid">
        Login valid
      </button>
      <button onClick={() => login("wrong@email.com", "badpass")} data-testid="btn-login-invalid">
        Login invalid
      </button>
      <button onClick={logout} data-testid="btn-logout">
        Logout
      </button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>
  );
}

// ── localStorage mock ────────────────────────────────────────────────────────

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

// ── tests ────────────────────────────────────────────────────────────────────

describe("AuthContext", () => {
  it("starts unauthenticated with no stored session", () => {
    renderWithProvider();
    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
    expect(screen.getByTestId("email").textContent).toBe("none");
  });

  it("authenticates with valid credentials", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId("btn-login-valid"));

    expect(screen.getByTestId("status").textContent).toBe("authenticated");
    expect(screen.getByTestId("email").textContent).toBe("admin@dashboard.com");
  });

  it("persists session to localStorage on login", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId("btn-login-valid"));

    const stored = localStorage.getItem("auth_session");
    expect(stored).not.toBeNull();
    const session = JSON.parse(stored!);
    expect(session.user.email).toBe("admin@dashboard.com");
    expect(session.loggedAt).toBeTruthy();
  });

  it("does NOT authenticate with wrong credentials", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId("btn-login-invalid"));

    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
  });

  it("login returns false for wrong credentials", () => {
    let result: boolean | undefined;
    function LoginTester() {
      const { login } = useAuth();
      return (
        <button
          data-testid="test"
          onClick={() => { result = login("bad@email.com", "wrongpass"); }}
        >
          test
        </button>
      );
    }
    render(<AuthProvider><LoginTester /></AuthProvider>);
    act(() => {
      screen.getByTestId("test").click();
    });
    expect(result).toBe(false);
  });

  it("login returns true for valid credentials", () => {
    let result: boolean | undefined;
    function LoginTester() {
      const { login } = useAuth();
      return (
        <button
          data-testid="test"
          onClick={() => { result = login("admin@dashboard.com", "admin123"); }}
        >
          test
        </button>
      );
    }
    render(<AuthProvider><LoginTester /></AuthProvider>);
    act(() => {
      screen.getByTestId("test").click();
    });
    expect(result).toBe(true);
  });

  it("clears user state on logout", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId("btn-login-valid"));
    expect(screen.getByTestId("status").textContent).toBe("authenticated");

    await user.click(screen.getByTestId("btn-logout"));
    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
    expect(screen.getByTestId("email").textContent).toBe("none");
  });

  it("removes auth_session from localStorage on logout", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId("btn-login-valid"));
    expect(localStorage.getItem("auth_session")).not.toBeNull();

    await user.click(screen.getByTestId("btn-logout"));
    expect(localStorage.getItem("auth_session")).toBeNull();
  });

  it("restores session from localStorage on mount", () => {
    // Pre-populate localStorage with a session
    localStorage.setItem(
      "auth_session",
      JSON.stringify({ user: { email: "admin@dashboard.com", name: "Admin" }, loggedAt: new Date().toISOString() })
    );

    renderWithProvider();

    expect(screen.getByTestId("status").textContent).toBe("authenticated");
    expect(screen.getByTestId("email").textContent).toBe("admin@dashboard.com");
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("auth_session", "not-valid-json{{{");
    // Should not throw
    expect(() => renderWithProvider()).not.toThrow();
    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
  });
});
