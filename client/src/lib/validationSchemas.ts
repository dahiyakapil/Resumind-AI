// import * as z from "zod";

// // ✅ Sign In Schema
// export const schemaSignIn = z.object({
//   email: z.string().email("Please enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// // ✅ Sign Up Schema
// export const schemaSignUp = z
//   .object({
//     fullName: z.string().min(2, "Full name is required"),
//     email: z.string().email("Please enter a valid email"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirm: z.string().min(6, "Confirm Password is required"),
//   })
//   .refine((data) => data.password === data.confirm, {
//     message: "Passwords do not match",
//     path: ["confirm"],
//   });

// // ✅ TypeScript Types
// export type SignInFormData = z.infer<typeof schemaSignIn>;
// export type SignUpFormData = z.infer<typeof schemaSignUp>;











import { z } from "zod";

// Password regex: At least one uppercase, lowercase, number, special char
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

export const schemaSignIn = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const schemaSignUp = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type SignInFormData = z.infer<typeof schemaSignIn>;
export type SignUpFormData = z.infer<typeof schemaSignUp>;
