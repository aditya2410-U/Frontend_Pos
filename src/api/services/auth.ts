import apiClient from "../client";
import type { LoginInput, RegisterInput, AuthResponse } from "../schemas/auth";

export const authService = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post<{ data: AuthResponse }>("/auth/login", data);
    return (response as any).data; 
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return (response as any).data;
  },
  
  
  me: async (): Promise<AuthResponse['user']> => {
    const response = await apiClient.get("/auth/me");
    return (response as any).data;
  }
};
