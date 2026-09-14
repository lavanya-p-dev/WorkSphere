import axios from "axios";
import { addAuthToken } from "./interceptors/authInterceptor";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(addAuthToken);

export default apiClient;