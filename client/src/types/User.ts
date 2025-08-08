export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  // add other fields your backend returns
}

export interface AuthResponse {
  user: User;
  token: string;

}

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  avatar: string; 
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
