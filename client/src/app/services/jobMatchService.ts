// // src/services/jobMatchService.ts

// import axios from "@/lib/axios";

// export interface JobMatchResponse {
//   message: string;
//   data: {
//     _id: string;
//     user: string;
//     resumeText: string;
//     jobDescription: string;
//     createdAt: string;
//     updatedAt: string;
//     result: {
//       score: number;
//       missing_keywords: string[];
//       matched_keywords: string[];
//       strengths: string[];
//       weaknesses: string[];
//       suggestions: string[];
//       verdict_summary: string;
//     };
//   };
// }

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// export const matchResumeWithJob = async (
//   formData: FormData
// ): Promise<JobMatchResponse> => {
//   const response = await axios.post(`${API_BASE_URL}/job/match`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };




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

/**
 * Match resume with job description
 */
export const matchResumeWithJob = async (formData: FormData): Promise<JobMatchResponse> => {
  const response = await axios.post<JobMatchResponse>("/job/match", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
