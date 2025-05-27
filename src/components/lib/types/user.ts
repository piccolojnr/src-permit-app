import { User } from "@prisma/client";


export type SafeUser = Pick<User, 'id' | 'name' | 'email'>;
