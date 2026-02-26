import styled from "styled-components";
import { theme } from "@/styles/theme";

// ─── Page ─────────────────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[50]};
  padding: 0 16px;
`;

// ─── Card ─────────────────────────────────────────────────────────────────────
export const Card = styled.div`
  width: 100%;
  max-width: 448px;
  background-color: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: ${theme.shadows.md};
  padding: 32px;
`;

// ─── Header ───────────────────────────────────────────────────────────────────
export const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

export const IconBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: ${theme.colors.brand[500]};
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${theme.colors.gray[500]};
  font-size: 14px;
  margin: 4px 0 0 0;
`;

// ─── Form ─────────────────────────────────────────────────────────────────────
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
  margin-bottom: 6px;
`;

export const Input = styled.input`
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

// ─── Error ────────────────────────────────────────────────────────────────────
export const ErrorAlert = styled.div`
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

// ─── Submit ───────────────────────────────────────────────────────────────────
interface SubmitButtonProps { $loading: boolean }
export const SubmitButton = styled.button<SubmitButtonProps>`
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

// ─── Demo Note ────────────────────────────────────────────────────────────────
export const DemoNote = styled.p`
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.gray[400]};
`;
