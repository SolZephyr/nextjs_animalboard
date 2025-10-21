import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { and, eq, getTableColumns, ilike, or, sql } from 'drizzle-orm';
import { dbMedia, dbProfiles, dbUserProfileFavourites } from './schema';
import { Profile, ProfileListParams, ProfileListResult, ProfileState } from '@/lib/types';
import { createMedia } from './media';
import { readUserByClerk } from './users';

const db = drizzle(process.env.DATABASE_URL!);

export async function createProfile(profile: Profile): Promise<number> {
    // Avatar media
    if (profile.avatar) {
        // Create media first
        profile.avatarId = profile.avatar ? await (createMedia(profile.avatar)) : undefined;
    }
    // Profile
    const data: typeof dbProfiles.$inferInsert = {
        name: profile.name,
        nicknames: profile.nicknames,
        user: profile.user,
        avatarId: profile.avatarId ?? null,
        animal: profile.animal,
        breed: profile.breed,
        country: profile.country,
        home: profile.home,
        about: profile.about,
        dateOfBirth: new Date(),
        created: profile.created ?? new Date(),
        updated: null
    };
    const result = await db.insert(dbProfiles).values(data).returning({ insertedId: dbProfiles.id });
    return (result[0].insertedId ?? null);
}

export async function createProfileFavourite(clerkId: string, profileId: number): Promise<{ success: boolean; count: number; }> {
    const user = await readUserByClerk(clerkId);
    let success = false;
    if (user) {
        const data: typeof dbUserProfileFavourites.$inferInsert = {
            userId: user.id,
            profileId: profileId
        };
        success = ((await db.insert(dbUserProfileFavourites).values(data)).rowCount ?? 0) > 0;
    }
    const count = await db.$count(dbUserProfileFavourites, eq(dbUserProfileFavourites.profileId, profileId));
    return {
        success: success,
        count: count
    }
}

export async function readProfiles(params: ProfileListParams): Promise<ProfileListResult> {
    try {
        const userId = params?.userId ?? 0;
        const limit = params?.limit ?? 10;
        const page = params?.page ?? 1;
        const offset = (page - 1) * limit;
        let where = undefined;
        if (params.animal || params.country || params.query || params.name) {
            const exp1 = params.animal ? sql`lower(${dbProfiles.animal}) = ${params.animal?.toLowerCase()}` : undefined;
            const exp2 = params.country ? sql`lower(${dbProfiles.country}) = ${params.country?.toLowerCase()}` : undefined;
            const exp3 = params.query ? or(
                ilike(dbProfiles.name, `%${params.query}%`),
                ilike(dbProfiles.nicknames, `%${params.query}%`),
                ilike(dbProfiles.breed, `%${params.query}%`),
                ilike(dbProfiles.user, `%${params.query}%`)
            ) : undefined;
            const exp4 = params.name ? sql`lower(${dbProfiles.name}) = ${params.name?.toLowerCase()}` : undefined;
            where = and(exp1, exp2, exp3, exp4);
        }
        const data = await db.select(
            {
                ...getTableColumns(dbProfiles),
                avatar: dbMedia,
                followers: db.$count(dbUserProfileFavourites, eq(dbUserProfileFavourites.profileId, dbProfiles.id)),
                isFavourite: db.$count(dbUserProfileFavourites, and(eq(dbUserProfileFavourites.profileId, dbProfiles.id), eq(dbUserProfileFavourites.userId, userId)))
            })
            .from(dbProfiles)
            .leftJoin(dbMedia, eq(dbProfiles.avatarId, dbMedia.id))
            .where(where)
            .orderBy(dbProfiles.name)
            .limit(limit)
            .offset(offset);

        const total = await db.$count(dbProfiles, where);

        return {
            data: {
                profiles: data,
                meta: {
                    page: page,
                    limit: limit,
                    total: total
                }
            }
        }
    } catch (err) {
        console.error(err);
        return { error: "Error reading profiles." }
    }
}

export async function readProfile(id: number, userId?: number): Promise<Profile | null> {
    userId = userId ?? 0;
    const data = await db.select(
        {
            ...getTableColumns(dbProfiles),
            avatar: dbMedia,
            followers: db.$count(dbUserProfileFavourites, eq(dbUserProfileFavourites.profileId, dbProfiles.id)),
            isFavourite: db.$count(dbUserProfileFavourites, and(eq(dbUserProfileFavourites.profileId, dbProfiles.id), eq(dbUserProfileFavourites.userId, userId)))
        })
        .from(dbProfiles)
        .leftJoin(dbMedia, eq(dbProfiles.avatarId, dbMedia.id))
        .where(eq(dbProfiles.id, id))
        .limit(1)
        .offset(0);
    return data.length ? data[0] : null;
}

export async function updateProfile(profileId: number, data: ProfileState): Promise<{ updatedId: number }[]> {
    const result = await db.update(dbProfiles).set(data)
        .where(eq(dbProfiles.id, profileId)).returning({ updatedId: dbProfiles.id });
    return result;
}

export async function deleteProfile(profileId: number): Promise<boolean> {
    const result = await db.delete(dbProfiles).where(eq(dbProfiles.id, profileId));
    if (result.rows) {
        return true;
    }
    return false;
}