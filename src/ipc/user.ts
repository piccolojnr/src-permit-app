import { UserData, UserService } from '../components/lib/services/user.service';
import { ipcMain } from 'electron';

// Create user
ipcMain.handle('user:create', async (_, userData: UserData) => await UserService.createUser(userData))

// Get user by ID
ipcMain.handle('user:get-by-id', async (_, userId: number) => await UserService.getUserById(userId));

// Update user
ipcMain.handle('user:update', async (_, userId: number, userData: Partial<UserData>) => await UserService.updateUser(userId, userData));

// Delete user
ipcMain.handle('user:delete', async (_, userId: number) => await UserService.deleteUser(userId));

// Search users
ipcMain.handle('user:search', async (_, query: string) => await UserService.searchUsers(query));

// get all users
ipcMain.handle('user:get-all', async () => await UserService.getAllUsers());


