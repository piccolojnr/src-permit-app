import { ipcMain } from 'electron';
import { AuditService, AuditLogData } from '../components/lib/services/audit.service';

// Create audit log
ipcMain.handle('audit:create', async (_, logData: AuditLogData) => {
    try {
        const response = await AuditService.createLog(logData);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get log by ID
ipcMain.handle('audit:get-by-id', async (_, logId: number) => {
    try {
        const response = await AuditService.getLogById(logId);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get logs by user
ipcMain.handle('audit:get-by-user', async (_, userId: number) => {
    try {
        const response = await AuditService.getLogsByUser(userId);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get logs by action
ipcMain.handle('audit:get-by-action', async (_, action: string) => {
    try {
        const response = await AuditService.getLogsByAction(action);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get all logs
ipcMain.handle('audit:get-all', async () => {
    try {
        const response = await AuditService.getAllLogs();
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Get logs by date range
ipcMain.handle('audit:get-by-date-range', async (_, startDate: Date, endDate: Date) => {
    try {
        const response = await AuditService.getLogsByDateRange(startDate, endDate);
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}); 