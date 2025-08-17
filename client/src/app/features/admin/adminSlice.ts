import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User, ResumeTemplateData } from "@/types/User";
import apiClient from "@/lib/axios";
import type { AxiosError } from "axios";

/* -------------------- Async Thunks -------------------- */

// 🔹 Fetch all users (Admin only)
export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("admin/fetchAllUsers", async (_, thunkAPI) => {
  try {
    const res = await apiClient.get<{ success: boolean; users: User[] }>(
      "/admin/users"
    );
    return res.data.users ?? [];
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to fetch users"
    );
  }
});

// 🔹 Get single user
export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("admin/fetchUserById", async (id, thunkAPI) => {
  try {
    const res = await apiClient.get<{ success: boolean; user: User }>(
      `/admin/users/${id}`
    );
    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to fetch user"
    );
  }
});

// 🔹 Update user
export const updateAdmin = createAsyncThunk<
  User,
  { id: string; updates: Partial<User> },
  { rejectValue: string }
>("admin/updateUser", async ({ id, updates }, thunkAPI) => {
  try {
    const res = await apiClient.put<{ success: boolean; user: User }>(
      `/admin/users/${id}`,
      updates
    );
    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to update user"
    );
  }
});

// 🔹 Delete user
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteUser", async (id, thunkAPI) => {
  try {
    await apiClient.delete<{ success: boolean }>(`/admin/users/${id}`);
    return id;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to delete user"
    );
  }
});

// 🔹 Fetch all resumes
export const fetchAllResumes = createAsyncThunk<
  ResumeTemplateData[],
  void,
  { rejectValue: string }
>("admin/fetchAllResumes", async (_, thunkAPI) => {
  try {
    const res = await apiClient.get<{
      success: boolean;
      resumes: ResumeTemplateData[];
    }>("/admin/resumes");
    return res.data.resumes ?? [];
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to fetch resumes"
    );
  }
});

// 🔹 Get single resume
export const fetchResumeById = createAsyncThunk<
  ResumeTemplateData,
  string,
  { rejectValue: string }
>("admin/fetchResumeById", async (id, thunkAPI) => {
  try {
    const res = await apiClient.get<{
      success: boolean;
      resume: ResumeTemplateData;
    }>(`/admin/resumes/${id}`);
    return res.data.resume;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to fetch resume"
    );
  }
});

// 🔹 Update resume
export const updateResume = createAsyncThunk<
  ResumeTemplateData,
  { id: string; updates: Partial<ResumeTemplateData> },
  { rejectValue: string }
>("admin/updateResume", async ({ id, updates }, thunkAPI) => {
  try {
    const res = await apiClient.put<{
      success: boolean;
      resume: ResumeTemplateData;
    }>(`/admin/resumes/${id}`, updates);
    return res.data.resume;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to update resume"
    );
  }
});

// 🔹 Delete resume
export const deleteResume = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteResume", async (id, thunkAPI) => {
  try {
    await apiClient.delete<{ success: boolean }>(`/admin/resumes/${id}`);
    return id;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to delete resume"
    );
  }
});

// 🔹 Fetch reports
export const fetchReports = createAsyncThunk<
  ResumeTemplateData[],
  string | void,
  { rejectValue: string }
>("admin/fetchReports", async (userId, thunkAPI) => {
  try {
    if (userId) {
      const res = await apiClient.get<{
        success: boolean;
        reports: ResumeTemplateData[];
      }>(`/admin/users/${userId}/reports`);
      return res.data.reports ?? [];
    } else {
      const res = await apiClient.get<{
        success: boolean;
        reports: ResumeTemplateData[];
      }>("/admin/reports");
      return res.data.reports ?? [];
    }
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to fetch reports"
    );
  }
});

// 🔹 Delete report
export const deleteReport = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteReport", async (reportId, thunkAPI) => {
  try {
    await apiClient.delete(`admin/report/${reportId}`);
    return reportId;
  } catch (err) {
    const error = err as AxiosError<{ error?: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to delete report"
    );
  }
});

/* -------------------- Slice -------------------- */
interface AdminState {
  users: User[];
  resumes: ResumeTemplateData[];
  reports: ResumeTemplateData[];
  selectedUser?: User | null;
  selectedResume?: ResumeTemplateData | null;
  selectedReport?: ResumeTemplateData | null;
  loadingUsers: boolean;
  loadingResumes: boolean;
  loadingReports: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  resumes: [],
  reports: [],
  selectedUser: null,
  selectedResume: null,
  selectedReport: null,
  loadingUsers: false,
  loadingResumes: false,
  loadingReports: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- Users ---------- */
      .addCase(fetchAllUsers.pending, (state) => {
        state.loadingUsers = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = action.payload || "Failed to fetch users";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
      })

      /* ---------- Resumes ---------- */
      .addCase(fetchAllResumes.pending, (state) => {
        state.loadingResumes = true;
      })
      .addCase(fetchAllResumes.fulfilled, (state, action) => {
        state.loadingResumes = false;
        state.resumes = action.payload;
      })
      .addCase(fetchAllResumes.rejected, (state, action) => {
        state.loadingResumes = false;
        state.error = action.payload || "Failed to fetch resumes";
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.selectedResume = action.payload;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
        if (state.selectedResume?._id === action.payload._id) {
          state.selectedResume = action.payload;
        }
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter((r) => r._id !== action.payload);
        if (state.selectedResume?._id === action.payload) {
          state.selectedResume = null;
        }
      })

      /* ---------- Reports ---------- */
      .addCase(fetchReports.pending, (state) => {
        state.loadingReports = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loadingReports = false;
        state.error = action.payload || "Failed to fetch reports";
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter((r) => r._id !== action.payload);
        if (state.selectedReport?._id === action.payload) {
          state.selectedReport = null;
        }
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete report";
      });
  },
});

export default adminSlice.reducer;
