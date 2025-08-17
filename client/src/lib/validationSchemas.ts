// src/lib/validationSchemas.ts
import { z } from "zod";

// Signup schema
export const schemaSignup = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters")
      .max(50, "First name must be at most 50 characters"),

    lastName: z
      .string()
      .max(50, "Last name must be at most 50 characters")
      .optional()
      .or(z.literal("")), // allow empty string for optional

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

// OTP schema
export const schemaOtp = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});


// Sign-in schema (frontend matches backend rules)
export const schemaSignIn = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain a number" })
    .regex(/[!@#$%^&*]/, {
      message: "Password must contain a special character (!@#$%^&*)",
    }),
});
// Type inference for forms
export type SignupFormData = z.infer<typeof schemaSignup>;
export type SigninFormData = z.infer<typeof schemaSignIn>;
export type OtpFormData = z.infer<typeof schemaOtp>;
