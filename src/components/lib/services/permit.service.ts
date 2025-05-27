import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';


export interface PermitData {
    studentId: number;
    amountPaid: number;
    validityPeriod: number;
    issuedById: number;
}

export interface PermitResponse {
    success: boolean;
    permitCode?: string;
    qrCode?: string;
    error?: string;
}


// TODO: pagination, sorting, filtering
export class PermitService {


    static async createPermit(permitData: PermitData): Promise<PermitResponse> {
        try {
            const permitCode = this.generatePermitCode();
            const hashedCode = await bcrypt.hash(permitCode, 10);

            const permit = await prisma.permit.create({
                data: {
                    permitCode: hashedCode,
                    originalCode: permitCode,
                    validityPeriod: permitData.validityPeriod,
                    amountPaid: permitData.amountPaid,
                    studentId: permitData.studentId,
                    issuedById: permitData.issuedById,
                    status: 'active'
                },
                include: {
                    student: true
                }
            });

            // Generate QR Code
            const verificationUrl = `http://localhost:3000/verify.html?code=${permitCode}`;
            const qrCode = await QRCode.toDataURL(verificationUrl);

            return {
                success: true,
                permitCode,
                qrCode
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async verifyPermit(permitCode: string) {
        try {
            const permits = await prisma.permit.findMany({
                where: { status: 'active' },
                include: {
                    student: true,
                    issuedBy: {
                        select: {
                            username: true
                        }
                    }
                }
            });

            for (const permit of permits) {
                const isValid = await bcrypt.compare(permitCode, permit.permitCode);
                if (isValid) {
                    return {
                        valid: true,
                        permit,
                    };
                }
            }

            return { valid: false };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async revokePermit(permitId: number) {
        try {
            await prisma.permit.update({
                where: { id: permitId },
                data: { status: 'revoked' }
            });

            return { success: true };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getPermitStats() {
        try {
            const stats = await prisma.permit.groupBy({
                by: ['status'],
                _count: true
            });

            return stats;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async checkPermitValidity(permitId: number) {
        try {
            const permit = await prisma.permit.findUnique({
                where: { id: permitId },
                include: { student: true }
            });

            if (!permit) {
                return { exists: false };
            }

            const daysElapsed = Math.floor(
                (Date.now() - permit.createdAt.getTime()) / (1000 * 60 * 60 * 24)
            );
            const isExpired = daysElapsed > permit.validityPeriod;
            const daysRemaining = Math.max(0, permit.validityPeriod - daysElapsed);

            return {
                exists: true,
                permit,
                daysElapsed,
                daysRemaining,
                isExpired,
                status: isExpired ? 'expired' : permit.status
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private static generatePermitCode(): string {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let code = '';

        // Ensure at least one letter and one number
        code += letters.charAt(Math.floor(Math.random() * letters.length));
        code += numbers.charAt(Math.floor(Math.random() * numbers.length));

        // Fill the remaining 2 characters randomly
        const chars = letters + numbers;
        for (let i = 0; i < 2; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Shuffle the code to randomize the order
        return code.split('').sort(() => 0.5 - Math.random()).join('');
    }
} 