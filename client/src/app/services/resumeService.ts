// import axios from "axios";
// import type { AnalysisResponse } from "@/types/resumeAnalysis";

// import type { ResumeTemplateData } from "@/types/User";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export async function analyzeResumeApi(file: File): Promise<AnalysisResponse> {
//   const form = new FormData();
//   form.append("resume", file);

//   const response = await axios.post<AnalysisResponse>(
//     `${API_BASE_URL}/resume/analyze`,
//     form,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       withCredentials: true,
//     }
//   );

//   return response.data;
// }

// export async function fetchResumeHistoryApi() {
//   const response = await axios.get(`${API_BASE_URL}/resume/history`, {
//     withCredentials: true,
//   });
//   return response.data.reports;
// }

// export async function deleteResumeReportApi(reportId: string) {
//   const response = await axios.delete(`${API_BASE_URL}/resume/${reportId}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }

// export const reanalyzeResumeApi = async (
//   reportId: string
// ): Promise<AnalysisResponse> => {
//   const res = await axios.put(
//     `${API_BASE_URL}/resume/reanalyze/${reportId}`,
//     null,
//     {
//       withCredentials: true,
//     }
//   );
//   return res.data;
// };

// // ✅ Download AI Report PDF
// export async function downloadReportPdfApi(reportId: string): Promise<void> {
//   const response = await axios.get(`${API_BASE_URL}/resume/download/${reportId}`, {
//     responseType: "blob", // important for binary files like PDF
//     withCredentials: true,
//   });

//   const blob = new Blob([response.data], { type: "application/pdf" });
//   const downloadUrl = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");

//   link.href = downloadUrl;
//   link.download = `resume-report-${reportId}.pdf`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// // src/services/resumeService.ts
// export async function fetchResumeReportByIdApi(reportId: string) {
//   const response = await axios.get(`${API_BASE_URL}/resume/${reportId}`, {
//     withCredentials: true,
//   });
//   return response.data;
// }

// // ✅ Generate updated PDF with applied rewrites
// export async function downloadUpdatedResumePdfApi(
//   reportId: string,
//   appliedRewrites: Record<string, string>,
//   theme: string,
//   userData: ResumeTemplateData
// ) {
//   const response = await axios.post(
//     `${API_BASE_URL}/resume/download-updated/${reportId}`,
//     { appliedRewrites, theme, userData },
//     {
//       responseType: "blob",
//       withCredentials: true,
//     }
//   );

//   const blob = new Blob([response.data], { type: "application/pdf" });
//   const downloadUrl = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");

//   link.href = downloadUrl;
//   link.download = `updated-resume-${reportId}.pdf`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }



import axios from "@/lib/axios";
import type { AnalysisResponse } from "@/types/resumeAnalysis";
import type { ResumeTemplateData } from "@/types/User";

/**
 * Upload and analyze resume
 */
export async function analyzeResumeApi(file: File): Promise<AnalysisResponse> {
  const form = new FormData();
  form.append("resume", file);

  const response = await axios.post<AnalysisResponse>("/resume/analyze", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

/**
 * Get resume analysis history
 */
export async function fetchResumeHistoryApi() {
  const response = await axios.get("/resume/history");
  return response.data.reports;
}

/**
 * Delete a specific resume report
 */
export async function deleteResumeReportApi(reportId: string) {
  const response = await axios.delete(`/resume/${reportId}`);
  return response.data;
}

/**
 * Re-analyze a previously uploaded resume
 */
export async function reanalyzeResumeApi(reportId: string): Promise<AnalysisResponse> {
  const res = await axios.put<AnalysisResponse>(`/resume/reanalyze/${reportId}`);
  return res.data;
}

/**
 * Download original AI analysis report as PDF
 */
export async function downloadReportPdfApi(reportId: string): Promise<void> {
  const response = await axios.get(`/resume/download/${reportId}`, { responseType: "blob" });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `resume-report-${reportId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get a single resume report by ID
 */
export async function fetchResumeReportByIdApi(reportId: string) {
  const response = await axios.get(`/resume/${reportId}`);
  return response.data;
}

/**
 * Download updated resume as PDF after rewrites
 */
export async function downloadUpdatedResumePdfApi(
  reportId: string,
  appliedRewrites: Record<string, string>,
  theme: string,
  userData: ResumeTemplateData
) {
  const response = await axios.post(`/resume/download-updated/${reportId}`, { appliedRewrites, theme, userData }, { responseType: "blob" });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `updated-resume-${reportId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
