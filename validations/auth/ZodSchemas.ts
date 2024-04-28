import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string({
      message: "Name is required.",
    })
    .min(3, {
      message: "Name is not valid.",
    }),
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Email is not valid.",
    }),
  password: z
    .string({
      message: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

export const SignInSchema = z.object({
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Email is not valid.",
    }),
  password: z
    .string({
      message: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Email is not valid.",
    }),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string({
      message: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});
