"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  PageWrapper,
  Card,
  Header,
  IconBox,
  Title,
  Subtitle,
  Form,
  FieldGroup,
  Label,
  Input,
  ErrorAlert,
  SubmitButton,
  DemoNote,
} from "./LoginForm.styles";

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
