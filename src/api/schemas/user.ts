export interface User {
    id: string;
    name: string;
    email: string;
    organizationId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    roles?: {
        role: {
            id: string;
            name: string;
        };
        outlet: {
            id: string;
            name: string;
        };
    }[];
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    outletId?: string;
    roleId?: string;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
    isActive?: boolean;
}

export interface AssignRoleInput {
    userId: string;
    outletId: string;
    roleId: string;
}
