import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq, getTableColumns } from 'drizzle-orm';
import { dbUsers } from './schema';
import { User, UserState } from '@/lib/types';

const db = drizzle(process.env.DATABASE_URL!);

export async function createUser(user: UserState): Promise<number> {
    const data: typeof dbUsers.$inferInsert = {
        clerkId: user.clerkId,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        created: user.created ?? new Date(),
        updated: user.updated ?? null,
    };
    const result = await db.insert(dbUsers).values(data).returning({ insertedId: dbUsers.id });
    return (result[0].insertedId ?? null);
}

export async function handleClerkUser(user: UserState): Promise<number> {
    const data = await db.select({ ...getTableColumns(dbUsers) })
        .from(dbUsers)
        .where(eq(dbUsers.clerkId, user.clerkId))
        .limit(1)
        .offset(0);
    const found = data.length ? data[0] : null;
    if (!found) {
        return createUser(user);
    }
    return found.id;
}

export async function readUserByClerk(clerkId: string): Promise<User | null> {
    const data = await db.select({ ...getTableColumns(dbUsers) })
        .from(dbUsers)
        .where(eq(dbUsers.clerkId, clerkId))
        .limit(1)
        .offset(0);
    return data.length ? data[0] : null;
}