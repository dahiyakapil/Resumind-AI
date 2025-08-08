// src/services/jobMatchService.ts
import { baseURL } from "@/baseURL";
import axios from "@/lib/axios";

export interface JobMatchResponse {
  message: string;
  data: {
    _id: string;
    user: string;
    resumeText: string;
    jobDescription: string;
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
  };
}

export const matchResumeWithJob = async (
  formData: FormData
): Promise<JobMatchResponse> => {
  const response = await axios.post(`${baseURL}/job/match`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
