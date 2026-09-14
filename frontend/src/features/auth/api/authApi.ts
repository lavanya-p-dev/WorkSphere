import apiClient from "../../../api/apiClient";
import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

export const loginUser = async (
  request: LoginRequest
): Promise<LoginResponse> => {

  const response = await apiClient.post<LoginResponse>(
    "/api/auth/login",
    request
  );

  return response.data;
};