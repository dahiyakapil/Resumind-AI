// import type { SigninFormData } from "@/lib/validationSchemas";
// import type { AuthResponse, User } from "@/types/User";
// import apiClient from "@/lib/axios";

// type OAuthProvider = "google" | "github";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

// export async function signin(data: SigninFormData): Promise<AuthResponse> {
//   const res = await apiClient.post(`${API_BASE_URL}/auth/login`, data);
//   return res.data;
// }

// export async function getCurrentUser(): Promise<AuthResponse> {
//   const res = await apiClient.get(`${API_BASE_URL}/auth/me`);
//   return res.data;
// }

// export async function updateProfile(data: {
//   firstName: string;
//   lastName: string;
//   email: string;
// }): Promise<User> {
//   const res = await apiClient.put(`${API_BASE_URL}/auth/update-profile`, data, {
//     withCredentials: true,
//   });
//   return res.data.user;
// }

// export async function updatePassword(data: {
//   currentPassword: string;
//   newPassword: string;
// }): Promise<void> {
//   await apiClient.put(`${API_BASE_URL}/auth/update-password`, data, {
//     withCredentials: true,
//   });
// }

// export async function logoutUser(): Promise<void> {
//   await apiClient.post(
//     `${API_BASE_URL}/auth/logout`,
//     {},
//     { withCredentials: true }
//   );
// }

// export function oauthLogin(provider: OAuthProvider) {
//   window.location.href = `${API_BASE_URL}/auth/oauth/${provider}`;
// }

// export async function updateAvatar(style: string): Promise<AuthResponse> {
//   const res = await apiClient.put(
//     `${API_BASE_URL}/auth/update-avatar`,
//     { style },
//     { withCredentials: true }
//   );
//   return res.data;
// }

// src/services/auth.service.ts

// import type { AuthResponse, User } from "@/types/User";
// import apiClient from "@/lib/axios";

// /**
//  * Get current logged-in user
//  */
// export async function getCurrentUser(): Promise<AuthResponse> {
//   const res = await apiClient.get<AuthResponse>("/auth/me");
//   return res.data;
// }

// /**
//  * Update profile details
//  */
// export async function updateProfile(data: { firstName: string; lastName: string; email: string; }): Promise<User> {
//   const res = await apiClient.put<{ user: User }>("/auth/update-profile", data);
//   return res.data.user;
// }

// /**
//  * Update account password
//  */
// export async function updatePassword(data: { currentPassword: string; newPassword: string; }): Promise<void> {
//   await apiClient.put("/auth/update-password", data);
// }

// /**
//  * Logout the user
//  */
// export async function logoutUser(): Promise<void> {
//   localStorage.removeItem("token");
// }

// /**
//  * Update avatar style
//  */
// export async function updateAvatar(style: string): Promise<AuthResponse> {
//   const res = await apiClient.put<AuthResponse>("/auth/update-avatar", { style });
//   return res.data;
// }

import type { SigninFormData } from "@/lib/validationSchemas";
import type { AuthResponse, User } from "@/types/User";
import apiClient from "@/lib/axios";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)

export async function signin(data: SigninFormData): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>(
    `${API_BASE_URL}/auth/login`,
    data
  );
  return res.data;
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const res = await apiClient.get<AuthResponse>(`${API_BASE_URL}/auth/me`);
  return res.data;
}

export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<User> {
  const res = await apiClient.put<{ user: User }>(
    `${API_BASE_URL}/auth/update-profile`,
    data
  );
  return res.data.user;
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await apiClient.put<void>(`${API_BASE_URL}/auth/update-password`, data);
}

export async function logoutUser(): Promise<void> {
  await apiClient.post(
    `${API_BASE_URL}/auth/logout`,
    {}
  );
}



export async function updateAvatar(style: string): Promise<AuthResponse> {
  const res = await apiClient.put<AuthResponse>(
    `${API_BASE_URL}/auth/update-avatar`,
    { style }
  );
  return res.data;
}
