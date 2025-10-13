import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq } from 'drizzle-orm';
import { dbUsers } from './schema';

const db = drizzle(process.env.DATABASE_URL!);

export interface TestUser {
    id?: number;
    email: string;
    firstname: string;
    lastname: string;
    created?: Date;
    updated?: Date | null;
}

export interface TestUserState {
    id: number;
    email?: string;
    firstname?: string;
    lastname?: string;
}

export async function simpleAdd(user: TestUser): Promise<number> {
    const data: typeof dbUsers.$inferInsert = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        created: new Date(),
        updated: new Date()
    };
    const result = await db.insert(dbUsers).values(data);
    return (result.oid);
}

export async function simpleGet({ id }: { id?: number }): Promise<TestUser[]> {
    try {
        if (id) {
            return await db.select().from(dbUsers).where(eq(dbUsers.id, id));
        } else {
            return await db.select().from(dbUsers);
        }
    } catch (error) {
        console.dir({ error }, { depth: null });
        return new Promise(function () {
            //
        })
    }
}

export async function simpleEdit({ data }: { data: TestUserState }): Promise<TestUser[]> {
    const result = await db.update(dbUsers).set(data)
        .where(eq(dbUsers.id, data.id)).returning();
    return result;
}

export async function simpleRemove({ id }: { id: number }): Promise<boolean> {
    const result = await db.delete(dbUsers).where(eq(dbUsers.id, id));
    if (result.rows) {
        return true;
    }
    return false;
}