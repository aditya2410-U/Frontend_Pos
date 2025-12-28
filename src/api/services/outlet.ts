import apiClient from "../client";
import type { Outlet, CreateOutletInput, UpdateOutletInput } from "../schemas/outlet";

export const outletService = {
  getAll: async (): Promise<Outlet[]> => {
    const response = await apiClient.get<{ data: Outlet[] }>("/outlets");
    return (response as any).data;
  },

  getOne: async (id: string): Promise<Outlet> => {
    const response = await apiClient.get<{ data: Outlet }>(`/outlets/${id}`);
    return (response as any).data;
  },

  create: async (data: CreateOutletInput): Promise<Outlet> => {
    const response = await apiClient.post<{ data: Outlet }>("/outlets", data);
    return (response as any).data;
  },

  update: async (id: string, data: UpdateOutletInput): Promise<Outlet> => {
    const response = await apiClient.put<{ data: Outlet }>(`/outlets/${id}`, data);
    return (response as any).data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/outlets/${id}`);
  },
};
