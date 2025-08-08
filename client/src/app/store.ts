import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/authSlice";
import resumeAnalysisReducer from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import jobMatchReducer from "@/app/features/jobMatchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resumeAnalysis: resumeAnalysisReducer,
    jobMatch: jobMatchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
