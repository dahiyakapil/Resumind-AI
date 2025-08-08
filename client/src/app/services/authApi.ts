// // src/services/authApi.ts
// import type { SignInFormData, SignUpFormData } from "@/lib/validationSchemas";
// import type { AuthResponse, User } from "@/types/User";
// import axios from "@/lib/axios";
// import { baseURL } from "@/baseURL";

// type OAuthProvider = "google" | "github";

// export async function signin(data: SignInFormData): Promise<AuthResponse> {
//   const res = await axios.post(`${baseURL}/auth/login`, data, {
//     withCredentials: true,
//   });
//   return res.data;
// }

// export async function signup(data: SignUpFormData): Promise<void> {
//   const { fullName, email, password } = data;
//   const [firstName, ...rest] = fullName.trim().split(" ");
//   const lastName = rest.join(" ") || "";
//   await axios.post(`${baseURL}/auth/signup`, { firstName, lastName, email, password }, {
//     withCredentials: true,
//   });
// }

// export async function getCurrentUser(): Promise<AuthResponse> {
//   const res = await axios.get(`${baseURL}/auth/me`, { withCredentials: true });
//   return res.data;
// }

// export async function logoutUser(): Promise<void> {
//   await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true });
// }

// export function oauthLogin(provider: OAuthProvider) {
//   window.location.href = `${baseURL}/auth/oauth/${provider}`;
// }

// export async function updateProfile(data: {
//   firstName: string;
//   lastName: string;
//   email: string;
// }): Promise<User> {
//   const res = await axios.put(`${baseURL}/auth/update-profile`, data, {
//     withCredentials: true,
//   });
//   return res.data.user;
// }

// export async function updatePassword(data: {
//   currentPassword: string;
//   newPassword: string;
// }): Promise<void> {
//   await axios.put(`${baseURL}/auth/update-password`, data, {
//     withCredentials: true,
//   });
// }


// src/app/services/authApi.ts
import type { SignInFormData, SignUpFormData } from "@/lib/validationSchemas";
import type { AuthResponse, User } from "@/types/User";
import axios from "@/lib/axios";
import { baseURL } from "@/baseURL";

type OAuthProvider = "google" | "github";

export async function signin(data: SignInFormData): Promise<AuthResponse> {
  const res = await axios.post(`${baseURL}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
}

export async function signup(data: SignUpFormData): Promise<void> {
  const { fullName, email, password } = data;
  const [firstName, ...rest] = fullName.trim().split(" ");
  const lastName = rest.join(" ") || "";
  await axios.post(`${baseURL}/auth/signup`, { firstName, lastName, email, password }, {
    withCredentials: true,
  });
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const res = await axios.get(`${baseURL}/auth/me`, { withCredentials: true });
  return res.data;
}

export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<User> {
  const res = await axios.put(`${baseURL}/auth/update-profile`, data, {
    withCredentials: true,
  });
  return res.data.user;
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await axios.put(`${baseURL}/auth/update-password`, data, {
    withCredentials: true,
  });
}

export async function logoutUser(): Promise<void> {
  await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true });
}

export function oauthLogin(provider: OAuthProvider) {
  window.location.href = `${baseURL}/auth/oauth/${provider}`;
}


export async function updateAvatar(style: string): Promise<AuthResponse> {
  const res = await axios.put(
    `${baseURL}/auth/update-avatar`,
    { style },
    { withCredentials: true }
  );
  return res.data;
}
