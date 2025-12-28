import apiClient from "../client";
import type { Permission } from "../schemas/permission";

export const permissionService = {
  getAll: async (): Promise<Permission[]> => {
    const response = await apiClient.get<{ data: Permission[] }>("/permissions");
    return (response as any).data;
  },
};
