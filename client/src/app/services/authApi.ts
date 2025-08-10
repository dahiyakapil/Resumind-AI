// import type { SignInFormData, SignUpFormData } from "@/lib/validationSchemas";
// import type { AuthResponse, User } from "@/types/User";
// import axios from "@/lib/axios";

// type OAuthProvider = "google" | "github";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export async function signin(data: SignInFormData): Promise<AuthResponse> {
//   const res = await axios.post(`${API_BASE_URL}/auth/login`, data, {
//     withCredentials: true,
//   });
//   return res.data;
// }

// export async function signup(data: SignUpFormData): Promise<void> {
//   const { fullName, email, password } = data;
//   const [firstName, ...rest] = fullName.trim().split(" ");
//   const lastName = rest.join(" ") || "";
//   await axios.post(`${API_BASE_URL}/auth/signup`, { firstName, lastName, email, password }, {
//     withCredentials: true,
//   });
// }

// export async function getCurrentUser(): Promise<AuthResponse> {
//   const res = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
//   return res.data;
// }

// export async function updateProfile(data: {
//   firstName: string;
//   lastName: string;
//   email: string;
// }): Promise<User> {
//   const res = await axios.put(`${API_BASE_URL}/auth/update-profile`, data, {
//     withCredentials: true,
//   });
//   return res.data.user;
// }

// export async function updatePassword(data: {
//   currentPassword: string;
//   newPassword: string;
// }): Promise<void> {
//   await axios.put(`${API_BASE_URL}/auth/update-password`, data, {
//     withCredentials: true,
//   });
// }

// export async function logoutUser(): Promise<void> {
//   await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
// }

// export function oauthLogin(provider: OAuthProvider) {
//   window.location.href = `${API_BASE_URL}/auth/oauth/${provider}`;
// }

// export async function updateAvatar(style: string): Promise<AuthResponse> {
//   const res = await axios.put(
//     `${API_BASE_URL}/auth/update-avatar`,
//     { style },
//     { withCredentials: true }
//   );
//   return res.data;
// }

// src/services/auth.service.ts

import type { SignInFormData, SignUpFormData } from "@/lib/validationSchemas";
import type { AuthResponse, User } from "@/types/User";
import axios from "@/lib/axios"; // axios instance will handle baseURL + withCredentials

type OAuthProvider = "google" | "github";

/**
 * Sign in a user
 */
export async function signin(data: SignInFormData): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>("/auth/login", data, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Sign up a new user
 */
export async function signup(data: SignUpFormData): Promise<void> {
  const { fullName, email, password } = data;
  const [firstName, ...rest] = fullName.trim().split(" ");
  const lastName = rest.join(" ") || "";

  await axios.post("/auth/signup", { firstName, lastName, email, password });
}

/**
 * Get current logged-in user
 */
export async function getCurrentUser(): Promise<AuthResponse> {
  const res = await axios.get<AuthResponse>("/auth/me");
  return res.data;
}

/**
 * Update profile details
 */
export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<User> {
  const res = await axios.put<{ user: User }>("/auth/update-profile", data);
  return res.data.user;
}

/**
 * Update account password
 */
export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await axios.put("/auth/update-password", data);
}

/**
 * Logout the user
 */
export async function logoutUser(): Promise<void> {
  await axios.post("/auth/logout", {});
}

/**
 * Redirect to OAuth login
 */
export function oauthLogin(provider: OAuthProvider) {
  window.location.href = `/auth/oauth/${provider}`;
}

/**
 * Update avatar style
 */
export async function updateAvatar(style: string): Promise<AuthResponse> {
  const res = await axios.put<AuthResponse>("/auth/update-avatar", { style });
  return res.data;
}
