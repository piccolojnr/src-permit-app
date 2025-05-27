// src/lib/prisma/queries/user.ts
import { prisma } from '../client';

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({ where: { id } });
};
