import apiClient from "../client";
import type { User, CreateUserInput, UpdateUserInput, AssignRoleInput } from "../schemas/user";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<{ data: User[] }>("/users");
    return (response as any).data;
  },

  getOne: async (id: string): Promise<User> => {
    const response = await apiClient.get<{ data: User }>(`/users/${id}`);
    return (response as any).data;
  },

  create: async (data: CreateUserInput): Promise<User> => {
    const response = await apiClient.post<{ data: User }>("/users", data);
    return (response as any).data;
  },

  update: async (id: string, data: UpdateUserInput): Promise<User> => {
    const response = await apiClient.put<{ data: User }>(`/users/${id}`, data);
    return (response as any).data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  assignRole: async (data: AssignRoleInput): Promise<any> => {
      const response = await apiClient.post("/users/assign-role", data);
      return (response as any).data;
  }
};
