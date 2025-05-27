import { ipcMain } from 'electron';
import { PermissionService, PermissionData } from '../components/lib/services/permission.service';

// Create permission
ipcMain.handle('permission:create', async (_, permissionData: PermissionData) => {
    try {
        const response = await PermissionService.createPermission(permissionData);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get permission by ID
ipcMain.handle('permission:get-by-id', async (_, permissionId: number) => {
    try {
        const response = await PermissionService.getPermissionById(permissionId);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Update permission
ipcMain.handle('permission:update', async (_, permissionId: number, permissionData: Partial<PermissionData>) => {
    try {
        const response = await PermissionService.updatePermission(permissionId, permissionData);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Delete permission
ipcMain.handle('permission:delete', async (_, permissionId: number) => {
    try {
        const response = await PermissionService.deletePermission(permissionId);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get all permissions
ipcMain.handle('permission:get-all', async () => {
    try {
        const response = await PermissionService.getAllPermissions();
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}); 