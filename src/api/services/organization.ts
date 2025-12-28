import apiClient from "../client";
import type { CreateOrganizationInput, UpdateOrganizationInput, Organization } from "../schemas/organization";
import type { PaginatedResponse } from "../client";

export const organizationService = {
  getAll: async (page = 1, limit = 10, search = ""): Promise<PaginatedResponse<Organization>> => {
    const response = await apiClient.get("/super-admin/organizations", { params: { page, limit, search } });
    return (response as any).data;
  },

  getById: async (id: string): Promise<Organization> => {
    const response = await apiClient.get(`/super-admin/organizations/${id}`);
    return (response as any).data;
  },

  create: async (data: CreateOrganizationInput): Promise<Organization> => {
    const response = await apiClient.post("/super-admin/organizations", data);
    return (response as any).data;
  },

  update: async (id: string, data: UpdateOrganizationInput): Promise<Organization> => {
    const response = await apiClient.put(`/super-admin/organizations/${id}`, data);
    return (response as any).data;
  },

  suspend: async (id: string): Promise<void> => {
    await apiClient.patch(`/super-admin/organizations/${id}/suspend`);
  },

  activate: async (id: string): Promise<void> => {
    await apiClient.patch(`/super-admin/organizations/${id}/activate`);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/super-admin/organizations/${id}`);
  },
};
