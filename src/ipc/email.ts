// ipc/auth.ts
import { sendEmail } from '../components/lib/services/email.service';
import { ipcMain } from 'electron';

// Email methods
ipcMain.handle('email:send', async (_, { to, subject, text, html, attachments }) => {
    try {
        const result = await sendEmail({ to, subject, text, html, attachments });
        if (!result.success) {
            throw new Error(result.error || 'Failed to send email');
        }
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

