import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { JobMatchResult, JobMatchResponse } from '@/types/JobMatchResult '; 
import { matchResumeWithJob } from '@/app/services/jobMatchService';
import type { AxiosError } from 'axios';
interface JobMatchState {
  result: JobMatchResult | null;
  loading: boolean;
  error: string | null;
}

export const submitJobMatch = createAsyncThunk<
  JobMatchResult,
  FormData,
  { rejectValue: string }
>('jobMatch/submitJobMatch', async (formData, thunkAPI) => {
  try {
    const response: JobMatchResponse = await matchResumeWithJob(formData);
    return response.data;
  } catch (err) {
    // ✅ Safely type error as AxiosError
    const error = err as AxiosError<{ message: string }>;
    if (error.response?.data?.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

const initialState: JobMatchState = {
  result: null,
  loading: false,
  error: null,
};

const jobMatchSlice = createSlice({
  name: 'jobMatch',
  initialState,
  reducers: {
    clearJobMatch: (state) => {
      state.result = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('jobMatchResult');
    },
    restoreJobMatch: (state, action: PayloadAction<JobMatchResult>) => {
      state.result = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitJobMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitJobMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        localStorage.setItem('jobMatchResult', JSON.stringify(action.payload));
      })
      .addCase(submitJobMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to match job';
      });
  },
});

export const { clearJobMatch, restoreJobMatch } = jobMatchSlice.actions;
export default jobMatchSlice.reducer;