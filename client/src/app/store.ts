import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/authSlice";
import resumeAnalysisReducer from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import jobMatchReducer from "@/app/features/jobMatchSlice";

import sendOtpReducer from "@/app/features/otp/sendOtp"
import verifyOtpReducer from "@/app/features/otp/verifyOtp"
import loginReducer from "@/app/features/signInSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login:loginReducer,
    sendOtp: sendOtpReducer,
    verifyOtp: verifyOtpReducer,
    resumeAnalysis: resumeAnalysisReducer,
    jobMatch: jobMatchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
