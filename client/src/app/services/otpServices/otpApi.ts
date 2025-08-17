import axios, { AxiosError } from "axios";
import type {
  ApiResponse,
  SendOtpPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/types/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const sendOtpService = async (
  data: SendOtpPayload
): Promise<ApiResponse> => {
  try {
    const res = await axios.post<ApiResponse>(
      `${API_BASE_URL}/auth/send-otp`,
      data
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    throw (
      axiosError.response?.data || {
        success: false,
        message: "Failed to send OTP",
      }
    );
  }
};

export const verifyOtpService = async (
  data: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  try {
    const res = await axios.post<VerifyOtpResponse>(
      `${API_BASE_URL}/auth/verify-otp`,
      data
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<VerifyOtpResponse>;
    throw (
      axiosError.response?.data || {
        success: false,
        message: "OTP verification failed",
      }
    );
  }
};
