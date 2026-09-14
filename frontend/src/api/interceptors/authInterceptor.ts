import type { InternalAxiosRequestConfig } from "axios";
import { authStorage } from "../../features/auth/services/authStorage";

export const addAuthToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {

  const token = authStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};