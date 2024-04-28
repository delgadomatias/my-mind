import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

// Types used on Sign Up form fields.
export type SignUpFormData = {
  email: string;
  name: string;
  password: string;
};

export interface SignUpFormField extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  errorMessage?: string;
  name: SignUpValidFieldNames;
  register: UseFormRegister<SignUpFormData>;
}

export type SignUpValidFieldNames = keyof SignUpFormData;

// Types used on Sign In
export type SignInFormData = {
  email: string;
  password: string;
};

export interface SignInFormField extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  errorMessage?: string;
  name: keyof SignInFormData;
  register: UseFormRegister<SignInFormData>;
}

// Helpers: Forgot Password
export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
}
