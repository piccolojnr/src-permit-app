import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';


// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'knutsforduniversitysrc@gmail.com',
        pass: 'krfp zrac sudd tprt'    // Your Gmail App Password
    },
    tls: {
        rejectUnauthorized: false
    }
});

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
    attachments?: {
        filename: string;
        content: Buffer | string;
        encoding?: string;
        cid?: string;
    }[];
}

export async function sendEmail({ to, subject, text, html, attachments }: EmailOptions) {
    try {
        const logoPath = path.join(app.getAppPath(), 'assets', 'knutsford_logo.png');
        const logoContent = fs.readFileSync(logoPath);

        const mailOptions = {
            from: {
                name: 'Knutsford University SRC',
                address: 'knutsforduniversitysrc@gmail.com'
            },
            to,
            subject,
            text,
            html,
            attachments: [
                ...(attachments || []),
                {
                    filename: 'knutsford_logo.png',
                    content: logoContent,
                    cid: 'knutsford-logo'
                }
            ],
            headers: {
                'X-Entity-Ref-ID': Date.now().toString(),
                'X-Auto-Response-Suppress': 'OOF, AutoReply',
                'Precedence': 'bulk'
            },
            priority: 'high' as 'high' | 'normal' | 'low',
            date: new Date()
        };

        const response = await transporter.sendMail(mailOptions);
        if (!response.accepted || response.accepted.length === 0) {
            throw new Error('Email not accepted by the server');
        }
        return { success: true };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return {
            success: false,
            error: error.message
        };
    }
} 