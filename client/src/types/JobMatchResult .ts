// ✅ src/types/jobMatchTypes.ts

export interface JobMatchResult {
  _id: string;
  user: string;
  resumeText?: string; // Optional if you're omitting in UI
  jobDescription?: string; // Optional if you're omitting in UI
  createdAt: string;
  updatedAt: string;
  result: {
    score: number;
    missing_keywords: string[];
    matched_keywords: string[];
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    verdict_summary: string;
  };
}

export interface JobMatchResponse {
  message: string;
  data: JobMatchResult;
}
