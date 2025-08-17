
import  type {  ResumeTemplateData ,  ApiResponse, User} from "./User"



export type AdminUsersResponse = ApiResponse<User[]>;
export type AdminResumesResponse = ApiResponse<ResumeTemplateData[]>;


export interface UpdateUserPayload {
  id: string;
  role?: "admin" | "user";
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface DeleteUserPayload {
  id: string;
}

export interface DeleteResumePayload {
  id: string;
}
