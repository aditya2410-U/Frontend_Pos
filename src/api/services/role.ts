import apiClient from "../client";
import type { Role, CreateRoleInput, UpdateRoleInput } from "../schemas/role";

export const roleService = {
  getAll: async (): Promise<Role[]> => {
    const response = await apiClient.get<{ data: Role[] }>("/roles");
    return (response as any).data;
  },

  getOne: async (id: string): Promise<Role> => {
    const response = await apiClient.get<{ data: Role }>(`/roles/${id}`);
    return (response as any).data;
  },

  create: async (data: CreateRoleInput): Promise<Role> => {
    const response = await apiClient.post<{ data: Role }>("/roles", data);
    return (response as any).data;
  },

  update: async (id: string, data: UpdateRoleInput): Promise<Role> => {
    const response = await apiClient.put<{ data: Role }>(`/roles/${id}`, data);
    return (response as any).data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/roles/${id}`);
  },
};
