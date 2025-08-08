import axios from "axios";
import type { AnalysisResponse } from "@/types/resumeAnalysis";
import { baseURL } from "@/baseURL";
import type { ResumeTemplateData } from "@/types/User";

export async function analyzeResumeApi(file: File): Promise<AnalysisResponse> {
  const form = new FormData();
  form.append("resume", file); 

  const response = await axios.post<AnalysisResponse>(
    `${baseURL}/resume/analyze`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
}

export async function fetchResumeHistoryApi() {
  const response = await axios.get(`${baseURL}/resume/history`, {
    withCredentials: true,
  });
  return response.data.reports;
}

export async function deleteResumeReportApi(reportId: string) {
  const response = await axios.delete(`${baseURL}/resume/${reportId}`, {
    withCredentials: true,
  });
  return response.data;
}

export const reanalyzeResumeApi = async (
  reportId: string
): Promise<AnalysisResponse> => {
  const res = await axios.put(
    `${baseURL}/resume/reanalyze/${reportId}`,
    null,
    {
      withCredentials: true,
    }
  );
  return res.data;
};


// ✅ Download AI Report PDF
export async function downloadReportPdfApi(reportId: string): Promise<void> {
  const response = await axios.get(`${baseURL}/resume/download/${reportId}`, {
    responseType: "blob", // important for binary files like PDF
    withCredentials: true,
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `resume-report-${reportId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// src/services/resumeService.ts
export async function fetchResumeReportByIdApi(reportId: string) {
  const response = await axios.get(`${baseURL}/resume/${reportId}`, {
    withCredentials: true,
  });
  return response.data;
}





// ✅ Generate updated PDF with applied rewrites
export async function downloadUpdatedResumePdfApi(
  reportId: string,
  appliedRewrites: Record<string, string>,
  theme: string,
  userData: ResumeTemplateData
) {
  const response = await axios.post(
    `${baseURL}/resume/download-updated/${reportId}`,
    { appliedRewrites, theme, userData },
    {
      responseType: "blob",
      withCredentials: true,
    }
  );

  const blob = new Blob([response.data], { type: "application/pdf" });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `updated-resume-${reportId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
