import * as z from "zod";

// ✅ Sign In Schema
export const schemaSignIn = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Sign Up Schema
export const schemaSignUp = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

// ✅ TypeScript Types
export type SignInFormData = z.infer<typeof schemaSignIn>;
export type SignUpFormData = z.infer<typeof schemaSignUp>;
