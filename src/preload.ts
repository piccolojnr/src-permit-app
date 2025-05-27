import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    auth: {
        // Auth methods
        login: (credentials: { username: string; password: string }) =>
            ipcRenderer.invoke('auth:login', credentials),
        verifyToken: (token: string) =>
            ipcRenderer.invoke('auth:verify-token', token),
        getPermissions: (userId: number) =>
            ipcRenderer.invoke('auth:get-permissions', userId),
        // tokens
        loadToken: () => ipcRenderer.invoke('auth:load-token'),
        saveToken: (token: string) => ipcRenderer.invoke('auth:save-token', token),
        clearToken: () => ipcRenderer.invoke('auth:clear-token'),
    },
    user: {
        create: (userData: any) =>
            ipcRenderer.invoke('user:create', userData),
        getById: (userId: number) =>
            ipcRenderer.invoke('user:get-by-id', userId),
        update: (userId: number, userData: Partial<any>) =>
            ipcRenderer.invoke('user:update', userId, userData),
        delete: (userId: number) =>
            ipcRenderer.invoke('user:delete', userId),
        search: (query: string) =>
            ipcRenderer.invoke('user:search', query),
        getAll: () =>
            ipcRenderer.invoke('user:get-all'),
    },

    student: {
        create: (studentData: any) =>
            ipcRenderer.invoke('student:create', studentData),
        getById: (studentId: number) =>
            ipcRenderer.invoke('student:get-by-id', studentId),
        update: (studentId: number, studentData: Partial<any>) =>
            ipcRenderer.invoke('student:update', studentId, studentData),
        delete: (studentId: number) =>
            ipcRenderer.invoke('student:delete', studentId),
        getAll: (param: { page: number, pageSize: number, search?: string }) =>
            ipcRenderer.invoke('student:get-all', param),
        import: (fileContent: string) =>
            ipcRenderer.invoke('student:import', fileContent),
    },

    permit: {
        create: (permitData: any) =>
            ipcRenderer.invoke('permit:create', permitData),
        verify: (permitCode: string) =>
            ipcRenderer.invoke('permit:verify', permitCode),
        revoke: (permitId: number) =>
            ipcRenderer.invoke('permit:revoke', permitId),
        stats: () =>
            ipcRenderer.invoke('permit:stats'),
        checkValidity: (permitId: number) =>
            ipcRenderer.invoke('permit:check-validity', permitId)
    },

    role: {
        create: (roleData: any) =>
            ipcRenderer.invoke('role:create', roleData),
        getById: (roleId: number) =>
            ipcRenderer.invoke('role:get-by-id', roleId),
        update: (roleId: number, roleData: Partial<any>) =>
            ipcRenderer.invoke('role:update', roleId, roleData),
        delete: (roleId: number) =>
            ipcRenderer.invoke('role:delete', roleId),
        getAll: () =>
            ipcRenderer.invoke('role:get-all'),
    },

    permission: {
        create: (permissionData: any) =>
            ipcRenderer.invoke('permission:create', permissionData),
        getById: (permissionId: number) =>
            ipcRenderer.invoke('permission:get-by-id', permissionId),
        update: (permissionId: number, permissionData: Partial<any>) =>
            ipcRenderer.invoke('permission:update', permissionId, permissionData),
        delete: (permissionId: number) =>
            ipcRenderer.invoke('permission:delete', permissionId),
        getAll: () =>
            ipcRenderer.invoke('permission:get-all'),
    },

    audit: {
        create: (logData: any) =>
            ipcRenderer.invoke('audit:create', logData),
        getById: (logId: number) =>
            ipcRenderer.invoke('audit:get-by-id', logId),
        getByUser: (userId: number) =>
            ipcRenderer.invoke('audit:get-by-user', userId),
        getByAction: (action: string) =>
            ipcRenderer.invoke('audit:get-by-action', action),
        getAll: () =>
            ipcRenderer.invoke('audit:get-all'),
        getByDateRange: (startDate: Date, endDate: Date) =>
            ipcRenderer.invoke('audit:get-by-date-range', startDate, endDate),
    }
});
