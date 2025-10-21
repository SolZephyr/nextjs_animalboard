import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq, getTableColumns } from 'drizzle-orm';
import { dbProfiles, dbUsers } from './schema';
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
    } /*else {
        return updateUser(user);
    }*/
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

export async function updateUser(user: UserState): Promise<number> {
    const result = await db.update(dbUsers).set(user)
        .where(eq(dbUsers.clerkId, user.clerkId))
        .returning({ updatedId: dbProfiles.id });
    return (result[0].updatedId ?? null);
}

// export async function deleteProfile(profileId: number): Promise<boolean> {
//     const result = await db.delete(dbProfiles).where(eq(dbProfiles.id, profileId));
//     if (result.rows) {
//         return true;
//     }
//     return false;
// }