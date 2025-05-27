// ipc/auth.ts
import { ipcMain } from 'electron';
import { AuthService, LoginCredentials } from '../components/lib/services/auth.service';
import { clearToken, loadToken, saveToken } from "../components/lib/auth/auth.storage"


// Auth methods
ipcMain.handle('auth:login', async (_, credentials: LoginCredentials) => {
    try {
        const response = await AuthService.login(credentials);
        return { success: true, data: response };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('auth:verify-token', async (_, token: string) => {
    try {
        const decoded = await AuthService.verifyToken(token);
        return { success: true, data: decoded };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('auth:get-permissions', async (_, userId: number) => {
    try {
        const permissions = await AuthService.getUserPermissions(userId);
        return { success: true, data: permissions };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});



// Token management
ipcMain.handle("auth:save-token", (_, token) => saveToken(token))
ipcMain.handle("auth:load-token", () => loadToken())
ipcMain.handle("auth:clear-token", () => clearToken())