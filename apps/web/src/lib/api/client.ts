import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const isAuthPage = window.location.pathname.startsWith("/login") || 
                          window.location.pathname.startsWith("/signup");
        const isAuthCheck = error.config?.url?.includes("/auth/me");
        
        // Don't redirect if already on auth page or checking auth status
        if (!isAuthPage && !isAuthCheck) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);
