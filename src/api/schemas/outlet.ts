export interface Outlet {
    id: string;
    organizationId: string;
    name: string;
    address: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOutletInput {
    name: string;
    address?: string;
}

export interface UpdateOutletInput {
    name?: string;
    address?: string;
    isActive?: boolean;
}
