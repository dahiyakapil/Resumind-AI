// import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { AnalysisResponse } from "@/types/resumeAnalysis";
// import { analyzeResumeApi, deleteResumeReportApi, fetchResumeHistoryApi } from "@/services/resumeService";
// import axios from "axios";

// interface ResumeAnalysisState {
//   loading: boolean;
//   error: string | null;
//   data: AnalysisResponse | null;
//   history: AnalysisResponse[];
// }

// const LOCAL_KEY = "resume-analysis-data";

// const getInitialData = (): AnalysisResponse | null => {
//   if (typeof window !== "undefined") {
//     const saved = localStorage.getItem(LOCAL_KEY);
//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch {
//         return null;
//       }
//     }
//   }
//   return null;
// };

// // ✅ Fetch resume history
// export const fetchResumeHistory = createAsyncThunk(
//   "resumeAnalysis/fetchHistory",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await fetchResumeHistoryApi();
//     } catch (err: any) {
//       return rejectWithValue(err.message || "Failed to fetch history");
//     }
//   }
// );

// // ✅ Delete resume report
// export const deleteResumeReport = createAsyncThunk(
//   "resumeAnalysis/deleteReport",
//   async (reportId: string, { rejectWithValue }) => {
//     try {
//       await deleteResumeReportApi(reportId);
//       return reportId;
//     } catch (err: any) {
//       return rejectWithValue(err.message || "Failed to delete report");
//     }
//   }
// );

// const initialState: ResumeAnalysisState = {
//   loading: false,
//   error: null,
//   data: getInitialData(),
//   history: [],
// };

// interface BackendError {
//   message?: string;
// }

// export const analyzeResume = createAsyncThunk<
//   AnalysisResponse,
//   File,
//   { rejectValue: string }
// >("resumeAnalysis/analyzeResume", async (file, { rejectWithValue }) => {
//   try {
//     return await analyzeResumeApi(file);
//   } catch (err: unknown) {
//     let message = "Unknown error";

//     if (axios.isAxiosError(err)) {
//       const data = err.response?.data as BackendError | undefined;
//       if (data?.message) message = data.message;
//       else if (err.message) message = err.message;
//     } else if (err instanceof Error) {
//       message = err.message;
//     }

//     return rejectWithValue(message);
//   }
// });

// const resumeAnalysisSlice = createSlice({
//   name: "resumeAnalysis",
//   initialState,
//   reducers: {
//     clearCurrent(state) {
//       state.data = null;
//       state.error = null;
//       if (typeof window !== "undefined") {
//         localStorage.removeItem(LOCAL_KEY);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(analyzeResume.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(analyzeResume.fulfilled, (state, action: PayloadAction<AnalysisResponse>) => {
//         state.loading = false;
//         state.data = action.payload;

//         if (typeof window !== "undefined") {
//           localStorage.setItem(LOCAL_KEY, JSON.stringify(action.payload));
//         }

//         state.history = [
//           action.payload,
//           ...state.history.filter((h) => h.reportId !== action.payload.reportId),
//         ];
//       })
//       .addCase(analyzeResume.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Failed to analyze";
//       });

//   },
// });

// export const { clearCurrent } = resumeAnalysisSlice.actions;
// export default resumeAnalysisSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AnalysisResponse } from "@/types/resumeAnalysis";
import {
  analyzeResumeApi,
  fetchResumeHistoryApi,
  deleteResumeReportApi,
  reanalyzeResumeApi,
  downloadReportPdfApi,
  fetchResumeReportByIdApi,
  downloadUpdatedResumePdfApi,
} from "@/app/services/resumeService";
import axios from "axios";
import type { ResumeTemplateData } from "@/types/User";

interface ResumeAnalysisState {
  loading: boolean;
  error: string | null;
  data: AnalysisResponse | null;
  history: AnalysisResponse[];
  rewrites: {
    reportId: string;
    resumeUrl: string;
    resumeName: string;
    rewrites: {
      original: string;
      rewritten: string;
    }[];
  } | null;
}

const LOCAL_KEY = "resume-analysis-data";

const getInitialData = (): AnalysisResponse | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  }
  return null;
};

const initialState: ResumeAnalysisState = {
  loading: false,
  error: null,
  data: getInitialData(),
  history: [],
  rewrites: null,
};

interface BackendError {
  message?: string;
}

// ✅ Analyze Resume
export const analyzeResume = createAsyncThunk<
  AnalysisResponse,
  File,
  { rejectValue: string }
>("resumeAnalysis/analyzeResume", async (file, { rejectWithValue }) => {
  try {
    return await analyzeResumeApi(file);
  } catch (err: unknown) {
    let message = "Unknown error";

    if (axios.isAxiosError(err)) {
      const data = err.response?.data as BackendError | undefined;
      if (data?.message) message = data.message;
      else if (err.message) message = err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    return rejectWithValue(message);
  }
});

// ✅ Fetch History
export const fetchResumeHistory = createAsyncThunk<
  AnalysisResponse[],
  void,
  { rejectValue: string }
>("resumeAnalysis/fetchHistory", async (_, { rejectWithValue }) => {
  try {
    return await fetchResumeHistoryApi();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch history";
    return rejectWithValue(message);
  }
});

// ✅ Delete Report
export const deleteResumeReport = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("resumeAnalysis/deleteReport", async (reportId, { rejectWithValue }) => {
  try {
    await deleteResumeReportApi(reportId);
    return reportId;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete report";
    return rejectWithValue(message);
  }
});

// ✅ Re-Analyze Resume (Re-Score)
export const reanalyzeResume = createAsyncThunk<
  AnalysisResponse,
  string,
  { rejectValue: string }
>("resumeAnalysis/reanalyze", async (reportId, { rejectWithValue }) => {
  try {
    return await reanalyzeResumeApi(reportId);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to re-analyze";
    return rejectWithValue(message);
  }
});

// ✅ Download PDF
export const downloadReportPdf = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("resumeAnalysis/downloadPdf", async (reportId, { rejectWithValue }) => {
  try {
    await downloadReportPdfApi(reportId);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to download PDF";
    return rejectWithValue(message);
  }
});

export const fetchRewriteByReportId = createAsyncThunk<
  ResumeAnalysisState["rewrites"],
  string,
  { rejectValue: string }
>(
  "resumeAnalysis/fetchRewriteByReportId",
  async (reportId, { rejectWithValue }) => {
    try {
      const data = await fetchResumeReportByIdApi(reportId);
      return {
        reportId: data.reportId,
        resumeUrl: data.resumeUrl,
        resumeName: data.resumeName,
        rewrites: data.rewrites || [],
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to fetch AI bullet rewrites.";
      return rejectWithValue(message);
    }
  }
);




// ✅ Download updated PDF with applied rewrites
export const downloadUpdatedPdfWithRewrites = createAsyncThunk<
  void,
  {
    reportId: string;
    appliedRewrites: Record<string, string>;
    theme: string;
    userData: ResumeTemplateData;
  },
  { rejectValue: string }
>("resumeAnalysis/downloadUpdatedPdfWithRewrites", async (args, { rejectWithValue }) => {
  try {
    await downloadUpdatedResumePdfApi(args.reportId, args.appliedRewrites, args.theme, args.userData);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to download updated PDF";
    return rejectWithValue(message);
  }
});


const resumeAnalysisSlice = createSlice({
  name: "resumeAnalysis",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.data = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_KEY);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        analyzeResume.fulfilled,
        (state, action: PayloadAction<AnalysisResponse>) => {
          state.loading = false;
          state.data = action.payload;

          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(action.payload));
          }

          state.history = [
            action.payload,
            ...state.history.filter(
              (h) => h.reportId !== action.payload.reportId
            ),
          ];
        }
      )
      .addCase(analyzeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to analyze";
      })

      // ✅ Fetch History
      .addCase(
        fetchResumeHistory.fulfilled,
        (state, action: PayloadAction<AnalysisResponse[]>) => {
          state.history = action.payload;
        }
      )
      .addCase(fetchResumeHistory.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to fetch history.";
      })

      // ✅ Delete Report
      .addCase(
        deleteResumeReport.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.history = state.history.filter(
            (h) => h.reportId !== action.payload
          );
        }
      )
      .addCase(deleteResumeReport.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete report.";
      })
      // ✅ Reanalyze Resume
      .addCase(
        reanalyzeResume.fulfilled,
        (state, action: PayloadAction<AnalysisResponse>) => {
          const updated = action.payload;
          const index = state.history.findIndex(
            (h) => h.reportId === updated.reportId
          );

          if (index !== -1) {
            state.history[index] = updated; // update in-place
          } else {
            state.history.unshift(updated); // or insert if not found
          }

          // Also update local storage if it's the current one
          if (state.data?.reportId === updated.reportId) {
            state.data = updated;
            if (typeof window !== "undefined") {
              localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
            }
          }
        }
      )
      .addCase(reanalyzeResume.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to re-analyze report.";
      })

      // REWRITE SUGGESTION
      .addCase(fetchRewriteByReportId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewriteByReportId.fulfilled, (state, action) => {
        state.loading = false;
        state.rewrites = action.payload;
      })
      .addCase(fetchRewriteByReportId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch rewrites";
      });
  },
});

export const { clearCurrent } = resumeAnalysisSlice.actions;
export default resumeAnalysisSlice.reducer;
