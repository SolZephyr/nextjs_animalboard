import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { desc, eq } from 'drizzle-orm';
import { dbProfiles } from './schema';
import { Profile, ProfileListParams, ProfileListResult, ProfileState } from '@/lib/types';

const db = drizzle(process.env.DATABASE_URL!);

export async function createProfile(profile: Profile): Promise<number> {
    const data: typeof dbProfiles.$inferInsert = {
        name: profile.name,
        nicknames: profile.nicknames,
        user: profile.user,
        avatar: profile.avatar,
        animal: profile.animal,
        breed: profile.breed,
        country: profile.country,
        home: profile.home,
        about: profile.about,
        dateOfBirth: new Date(),
        created: new Date(),
        updated: new Date()
    };
    const result = await db.insert(dbProfiles).values(data);
    return (result.oid);
}

export async function readProfiles(params: ProfileListParams): Promise<ProfileListResult> {
    try {
        const limit = params?.limit ?? 10;
        const page = params?.page ?? 1;
        const offset = (page - 1) * limit;
        const where = undefined;
        const sort = desc(dbProfiles.created);
        const data = await db.select().from(dbProfiles)
            .where(where)
            .orderBy(sort)
            .limit(limit)
            .offset(offset);

        const count = await db.$count(dbProfiles, where);

        return {
            data: {
                profiles: data,
                meta: {
                    page: page,
                    limit: limit,
                    total: count
                }
            }
        }
    } catch (err) {
        console.error(err);
        return { error: "Error reading profiles." }
    }
}

export async function readProfile(id: number): Promise<Profile | null> {
    const data = await db.select().from(dbProfiles)
        .where(eq(dbProfiles.id, id))
        .limit(1)
        .offset(0);
    return data.length ? data[0] : null;
}

export async function updateProfile(profileId: number, data: ProfileState): Promise<Profile[]> {
    const result = await db.update(dbProfiles).set(data)
        .where(eq(dbProfiles.id, profileId)).returning();
    return result;
}

export async function deleteProfile(profileId: number): Promise<boolean> {
    const result = await db.delete(dbProfiles).where(eq(dbProfiles.id, profileId));
    if (result.rows) {
        return true;
    }
    return false;
}