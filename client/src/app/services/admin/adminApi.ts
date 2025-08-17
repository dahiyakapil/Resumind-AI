// src/app/services/adminApi.ts
import apiClient from "@/lib/axios";
import type { User, ResumeTemplateData, ApiResponse } from "@/types/User";

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const res = await apiClient.get<ApiResponse<User[]>>("/admin/users");
    console.log(res.data);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching all users:", error.message);
    }
    throw error;
  }
};

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const res = await apiClient.get<ApiResponse<User>>(`/admin/users/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching user with id ${id}:`, error.message);
    }
    throw error;
  }
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<ApiResponse<User>> => {
  try {
    const res = await apiClient.put<ApiResponse<User>>(
      `/admin/users/${id}`,
      data
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating user with id ${id}:`, error.message);
    }
    throw error;
  }
};

export const deleteUserByAdmin = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const res = await apiClient.delete<ApiResponse<null>>(`/admin/users/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting user with id ${id}:`, error.message);
    }
    throw error;
  }
};

/**
 * ==========================
 * RESUMES (Admin CRUD)
 * ==========================
 */
export const getAllResumes = async (): Promise<
  ApiResponse<ResumeTemplateData[]>
> => {
  try {
    const res = await apiClient.get<ApiResponse<ResumeTemplateData[]>>(
      "/admin/resumes"
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching all resumes:", error.message);
    }
    throw error;
  }
};

export const getResumeById = async (
  id: string
): Promise<ApiResponse<ResumeTemplateData>> => {
  try {
    const res = await apiClient.get<ApiResponse<ResumeTemplateData>>(
      `/admin/resumes/${id}`
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching resume with id ${id}:`, error.message);
    }
    throw error;
  }
};

export const updateResume = async (
  id: string,
  data: Partial<ResumeTemplateData>
): Promise<ApiResponse<ResumeTemplateData>> => {
  try {
    const res = await apiClient.put<ApiResponse<ResumeTemplateData>>(
      `/admin/resumes/${id}`,
      data
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating resume with id ${id}:`, error.message);
    }
    throw error;
  }
};

export const deleteResume = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const res = await apiClient.delete<ApiResponse<null>>(
      `/admin/resumes/${id}`
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting resume with id ${id}:`, error.message);
    }
    throw error;
  }
};
