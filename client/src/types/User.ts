// export interface User {
//   id: string;
//   firstName: string;
//   lastName?: string;
//   email: string;
//   // add other fields your backend returns
// }

// export interface AuthResponse {
//   user: User;
//   token: string;

// }

// export interface User {
//   id: string;
//   firstName: string;
//   lastName?: string;
//   email: string;
//   avatar: string;
// }

// export interface ResumeTemplateData {
//   fullName: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
//   skills: string[];
//   education: {
//     degree: string;
//     institution: string;
//     years: string;
//   };
//   projects: {
//     title: string;
//     bullets: string[];
//   }[];
//   appliedRewrites: string[];
// }






export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  avatar: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ResumeTemplateData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    years: string;
  };
  projects: {
    title: string;
    bullets: string[];
  }[];
  appliedRewrites: string[];
}

/* ---------------- OTP Types ---------------- */

/** Generic API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/** Payload for sending OTP */
export interface SendOtpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


/** Payload for verifying OTP */
export interface VerifyOtpPayload {
  email?: string;
  phone?: string;
  otp: string;
}

/** Backend response for OTP verification */
export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string; // useful if verification logs in the user
}
