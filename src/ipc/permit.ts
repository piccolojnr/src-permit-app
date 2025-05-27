import { ipcMain } from 'electron';
import { PermitService, PermitData } from '../components/lib/services/permit.service';

// Get all permits with pagination
ipcMain.handle('permit:get-all', async (_, params: { page?: number; pageSize?: number; search?: string; status?: string }) => {
    try {
        const response = await PermitService.getPermits(params);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Create permit
ipcMain.handle('permit:create', async (_, permitData: PermitData) => {
    try {
        const response = await PermitService.createPermit(permitData);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Verify permit
ipcMain.handle('permit:verify', async (_, permitCode: string) => {
    try {
        const response = await PermitService.verifyPermit(permitCode);
        return { success: true, data: response };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Revoke permit
ipcMain.handle('permit:revoke', async (_, permitId: number) => {
    try {
        const response = await PermitService.revokePermit(permitId);
        return { success: true, data: response };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get permit statistics
ipcMain.handle('permit:stats', async () => {
    try {
        const stats = await PermitService.getPermitStats();
        return { success: true, data: stats };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});


// Check permit validity
ipcMain.handle('permit:check-validity', async (_, permitId: number) => {
    try {
        const response = await PermitService.checkPermitValidity(permitId);
        return { success: true, data: response };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}); 