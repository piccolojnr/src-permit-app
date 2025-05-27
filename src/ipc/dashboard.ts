import { ipcMain } from 'electron';
import { DashboardService } from '../components/lib/services/dashboard.service';

// Get dashboard statistics
ipcMain.handle('dashboard:get-stats', async () => {
    try {
        const response = await DashboardService.getStats();
        return response;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}); 