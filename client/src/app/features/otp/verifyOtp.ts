import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { VerifyOtpPayload, VerifyOtpResponse } from "@/types/User";
import { verifyOtpService } from "@/app/services/otpServices/otpApi";

interface VerifyOtpState {
  loading: boolean;
  error: string | null;
  verified: boolean;
}

const initialState: VerifyOtpState = {
  loading: false,
  error: null,
  verified: false,
};

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    return await verifyOtpService(payload);
  } catch (err) {
    const message =
      (err as VerifyOtpResponse).message || "OTP verification failed";
    return rejectWithValue(message);
  }
});

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {
    resetVerifyOtp: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verified = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;

        // Save token in localStorage
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "OTP verification failed";
      });
  },
});

export const { resetVerifyOtp } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;
