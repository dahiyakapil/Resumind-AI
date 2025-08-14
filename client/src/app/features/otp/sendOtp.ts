import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { SendOtpPayload, ApiResponse } from "@/types/User";
import { sendOtpService } from "@/app/services/otpServices/otpApi";

interface SendOtpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SendOtpState = {
  loading: false,
  error: null,
  success: false,
};

export const sendOtp = createAsyncThunk<
  ApiResponse,
  SendOtpPayload,
  { rejectValue: string }
>("auth/sendOtp", async (payload, { rejectWithValue }) => {
  try {
    return await sendOtpService(payload);
  } catch (err) {
    const message = (err as ApiResponse).message || "Failed to send OTP";
    return rejectWithValue(message);
  }
});

const sendOtpSlice = createSlice({
  name: "sendOtp",
  initialState,
  reducers: {
    resetSendOtp: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to send OTP";
      });
  },
});

export const { resetSendOtp } = sendOtpSlice.actions;
export default sendOtpSlice.reducer;
