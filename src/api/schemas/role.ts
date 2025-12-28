export interface Role {
    id: string;
    organizationId: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    permissions?: {
        permission: {
            id: string;
            key: string;
            description: string | null;
        }
    }[];
}

export interface CreateRoleInput {
    name: string;
    description?: string;
    permissions: string[];
}

export interface UpdateRoleInput {
    name?: string;
    description?: string;
    permissions?: string[];
}
