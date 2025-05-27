// src/renderer/types/window.d.ts

import { Permit, Student, Role, Permission, AuditLog } from '@prisma/client';
import type { User } from '../types/user';

interface JWT_Response {
    userId: number,
    role: string,
    permissions: string[],
    iat: number,
    exp: number
}

interface StudentData {
    studentId: string;
    name: string;
    email: string;
    course: string;
    level: string;
    number: string;
}

interface PermitData {
    studentId: number;
    amountPaid: number;
    validityPeriod: number;
    issuedById: number;
}

interface RoleData {
    name: string;
    description?: string;
    permissionIds: number[];
}

interface PermissionData {
    name: string;
    description?: string;
}

interface AuditLogData {
    userId: number;
    action: string;
    details: string;
}

interface RoleWithPermissions extends Role {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    permissions: {
        permission: Permission;
    }[];
}

interface PermissionWithRoles extends Permission {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    roles: {
        role: Role;
    }[];
}

interface AuditLogWithUser extends AuditLog {
    user: {
        username: string;
        email: string;
        role: {
            name: string;
        };
    };
}

declare global {
    interface Window {
        api: {
            auth: {
                // Auth methods
                login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; data?: { user: User; token: string }; error?: string }>;
                verifyToken: (token: string) => Promise<{ success: boolean; data?: JWT_Response; error?: string }>;
                getPermissions: (userId: number) => Promise<{ success: boolean; data?: string[]; error?: string }>;
                // tokens
                loadToken: () => Promise<string | null>;
                saveToken: (token: string) => Promise<void>;
                clearToken: () => Promise<void>;
            };
            user: {
                create: (userData: User) => Promise<{ success: boolean; data?: User; error?: string }>;
                getById: (userId: number) => Promise<{ success: boolean; data?: User; error?: string }>;
                update: (userId: number, userData: Partial<User>) => Promise<{ success: boolean; data?: User; error?: string }>;
                delete: (userId: number) => Promise<{ success: boolean; data?: { success: boolean }; error?: string }>;
                search: (query: string) => Promise<{ success: boolean; data?: User[]; error?: string }>;
                getAll: () => Promise<{ success: boolean; data?: User[]; error?: string }>;
            };
            student: {
                create: (studentData: StudentData) => Promise<{ success: boolean; data?: Student; error?: string }>;
                getById: (studentId: number) => Promise<{
                    success: boolean; data?: Student & {
                        permits: {
                            issuedBy: {
                                username: string;
                            };
                        }[];
                    }; error?: string
                }>;
                update: (studentId: number, studentData: Partial<StudentData>) => Promise<{ success: boolean; data?: Student; error?: string }>;
                delete: (studentId: number) => Promise<{ success: boolean; data?: { success: boolean }; error?: string }>;
                getAll: (params: { page?: number; pageSize?: number; search?: string }) => Promise<{
                    success: boolean;
                    data?: {
                        data: Student[];
                        total: number;
                        page: number;
                        pageSize: number;
                        totalPages: number;
                    };
                    error?: string;
                }>;
                import: (fileContent: string) => Promise<{
                    success: boolean;
                    data?: {
                        imported: number;
                        failed: number;
                        errors: string[];
                    };
                    error?: string;
                }>;
            };
            permit: {
                create: (permitData: PermitData) => Promise<{ success: boolean; permitCode?: string; qrCode?: string; error?: string }>;
                verify: (permitCode: string) => Promise<{
                    success: boolean; data?: {
                        valid: boolean; permit?: Permit & {
                            student: Student;
                            issuedBy: {
                                username: string;
                            };
                        };
                    }; error?: string
                }>;
                revoke: (permitId: number) => Promise<{ success: boolean; data?: { success: boolean }; error?: string }>;
                stats: () => Promise<{
                    success: boolean; data?: {
                        status: 'active' | 'revoked' | 'expired';
                        _count: number;
                    }[]; error?: string
                }>;
                checkValidity: (permitId: number) => Promise<{
                    success: boolean; data?: {
                        exists: boolean;
                        permit: Permit & {
                            student: Student;
                            issuedBy: {
                                username: string;
                            };
                        };
                        daysElapsed: number;
                        daysRemaining: number;
                        isExpired: boolean;
                        status: 'active' | 'revoked' | 'expired';
                    }; error?: string
                }>;
            };
            role: {
                create: (roleData: RoleData) => Promise<{ success: boolean; role?: RoleWithPermissions; error?: string }>;
                getById: (roleId: number) => Promise<{ success: boolean; role?: RoleWithPermissions; error?: string }>;
                update: (roleId: number, roleData: Partial<RoleData>) => Promise<{ success: boolean; role?: RoleWithPermissions; error?: string }>;
                delete: (roleId: number) => Promise<{ success: boolean; error?: string }>;
                getAll: () => Promise<{ success: boolean; role?: RoleWithPermissions[]; error?: string }>;
            };
            permission: {
                create: (permissionData: PermissionData) => Promise<{ success: boolean; permission?: PermissionWithRoles; error?: string }>;
                getById: (permissionId: number) => Promise<{ success: boolean; permission?: PermissionWithRoles; error?: string }>;
                update: (permissionId: number, permissionData: Partial<PermissionData>) => Promise<{ success: boolean; permission?: PermissionWithRoles; error?: string }>;
                delete: (permissionId: number) => Promise<{ success: boolean; error?: string }>;
                getAll: () => Promise<{ success: boolean; permission?: PermissionWithRoles[]; error?: string }>;
            };
            audit: {
                create: (logData: AuditLogData) => Promise<{ success: boolean; log?: AuditLogWithUser; error?: string }>;
                getById: (logId: number) => Promise<{ success: boolean; log?: AuditLogWithUser; error?: string }>;
                getByUser: (userId: number) => Promise<{ success: boolean; log?: AuditLogWithUser[]; error?: string }>;
                getByAction: (action: string) => Promise<{ success: boolean; log?: AuditLogWithUser[]; error?: string }>;
                getAll: () => Promise<{ success: boolean; log?: AuditLogWithUser[]; error?: string }>;
                getByDateRange: (startDate: Date, endDate: Date) => Promise<{ success: boolean; log?: AuditLogWithUser[]; error?: string }>;
            };
        };
    }
}
