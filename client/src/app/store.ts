import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/authSlice";
import resumeAnalysisReducer from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import jobMatchReducer from "@/app/features/jobMatchSlice";

import sendOtpReducer from "@/app/features/otp/sendOtp";
import verifyOtpReducer from "@/app/features/otp/verifyOtp";
import loginReducer from "@/app/features/signInSlice";
import adminReducer from "@/app/features/admin/adminSlice";
import analyticsReducer from "@/app/features/admin/adminAnalytics";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    sendOtp: sendOtpReducer,
    verifyOtp: verifyOtpReducer,
    resumeAnalysis: resumeAnalysisReducer,
    jobMatch: jobMatchReducer,
    admin: adminReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
