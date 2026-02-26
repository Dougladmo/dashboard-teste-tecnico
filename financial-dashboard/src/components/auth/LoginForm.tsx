"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[50]};
  padding: 0 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 448px;
  background-color: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: ${theme.shadows.md};
  padding: 32px;
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

const IconBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: ${theme.colors.brand[500]};
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${theme.colors.gray[500]};
  font-size: 14px;
  margin: 4px 0 0 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[300]};
  color: ${theme.colors.gray[900]};
  font-size: 14px;
  font-family: ${theme.fonts.outfit};
  background-color: ${theme.colors.white};
  transition: border-color 150ms, box-shadow 150ms;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px ${theme.colors.brand[500]};
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.error[600]};
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[100]};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
`;

const SubmitButton = styled.button<{ $loading: boolean }>`
  width: 100%;
  padding: 10px 16px;
  background-color: ${theme.colors.brand[500]};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  font-family: ${theme.fonts.outfit};
  border: none;
  border-radius: 8px;
  transition: background-color 150ms;
  opacity: ${({ $loading }) => ($loading ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.brand[600]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.white}, 0 0 0 4px ${theme.colors.brand[500]};
  }
`;

const DemoNote = styled.p`
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.gray[400]};
`;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 300));

    const ok = login(email, password);
    if (ok) {
      router.replace("/dashboard");
    } else {
      setError("Incorrect email or password.");
    }
    setLoading(false);
  }

  return (
    <PageWrapper>
      <Card>
        <Header>
          <IconBox>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBox>
          <Title>Financial Dashboard</Title>
          <Subtitle>Sign in to your account to continue</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dashboard.com"
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FieldGroup>

          {error && (
            <ErrorAlert>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </ErrorAlert>
          )}

          <SubmitButton type="submit" disabled={loading} $loading={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </SubmitButton>
        </Form>

        <DemoNote>Demo credentials: admin@dashboard.com / admin123</DemoNote>
      </Card>
    </PageWrapper>
  );
}
