import { ipcMain } from 'electron';
import { RoleService, RoleData } from '../components/lib/services/role.service';

// Create role
ipcMain.handle('role:create', async (_, roleData: RoleData) => {
    try {
        const response = await RoleService.createRole(roleData);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get role by ID
ipcMain.handle('role:get-by-id', async (_, roleId: number) => {
    try {
        const response = await RoleService.getRoleById(roleId);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Update role
ipcMain.handle('role:update', async (_, roleId: number, roleData: Partial<RoleData>) => {
    try {
        const response = await RoleService.updateRole(roleId, roleData);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Delete role
ipcMain.handle('role:delete', async (_, roleId: number) => {
    try {
        const response = await RoleService.deleteRole(roleId);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get all roles
ipcMain.handle('role:get-all', async () => {
    try {
        const response = await RoleService.getAllRoles();
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}); 