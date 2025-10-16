import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { and, eq, getTableColumns, sql } from 'drizzle-orm';
import { dbMedia, dbPosts } from './schema';
import { ImportPost, Post, ProfileListParams } from '@/lib/types';
import { createMediaMultiple, createPostMedia } from './media';
import { readProfiles } from './profiles';

const db = drizzle(process.env.DATABASE_URL!);

export async function createPost(post: Post): Promise<number> {
    // Post media
    const images = post.images?.length ? await createMediaMultiple(post.images) : undefined;

    const data: typeof dbPosts.$inferInsert = {
        type: post.type,
        title: post.title,
        content: post.content,
        profileId: post.profileId,
        created: post.created ?? new Date(),
        updated: null
    }
    const result = await db.insert(dbPosts).values(data).returning({ insertedId: dbMedia.id });
    const postId = (result[0].insertedId ?? null);
    if (postId && images) {
        // Post one-many Media
        if (await createPostMedia(postId, images) < images.length) {
            console.error("Not all images were added to post");
        }
    }
    return postId;
}

export async function createImportPost(post: ImportPost): Promise<number> {
    const params: ProfileListParams = {
        page: 1,
        name: post.profileName
    }
    const profiles = await readProfiles(params);
    const profile = profiles.data?.profiles[0] ?? undefined;
    if (!profile) {
        return 0;
    }
    return createPost(post);
}

// export async function readProfiles(params: ProfileListParams): Promise<ProfileListResult> {
//     try {
//         const limit = params?.limit ?? 10;
//         const page = params?.page ?? 1;
//         const offset = (page - 1) * limit;
//         let where = undefined;
//         if (params.animal || params.country) {
//             const exp1 = params.animal ? sql`lower(${dbProfiles.animal}) = ${params.animal?.toLowerCase()}` : undefined;
//             const exp2 = params.country ? sql`lower(${dbProfiles.country}) = ${params.country?.toLowerCase()}` : undefined;
//             where = and(exp1, exp2);
//         }
//         const data = await db.select({ ...getTableColumns(dbProfiles), avatar: dbMedia })
//             .from(dbProfiles)
//             .leftJoin(dbMedia, eq(dbProfiles.avatarId, dbMedia.id))
//             .where(where)
//             .orderBy(dbProfiles.name)
//             .limit(limit)
//             .offset(offset);

//         const count = await db.$count(dbProfiles, where);

//         return {
//             data: {
//                 profiles: data,
//                 meta: {
//                     page: page,
//                     limit: limit,
//                     total: count
//                 }
//             }
//         }
//     } catch (err) {
//         console.error(err);
//         return { error: "Error reading profiles." }
//     }
// }

// export async function readProfile(id: number): Promise<Profile | null> {
//     const data = await db.select({ ...getTableColumns(dbProfiles), avatar: dbMedia })
//         .from(dbProfiles)
//         .leftJoin(dbMedia, eq(dbProfiles.avatarId, dbMedia.id))
//         .where(eq(dbProfiles.id, id))
//         .limit(1)
//         .offset(0);
//     return data.length ? data[0] : null;
// }

// export async function updateProfile(profileId: number, data: ProfileState): Promise<{ updatedId: number }[]> {
//     const result = await db.update(dbProfiles).set(data)
//         .where(eq(dbProfiles.id, profileId)).returning({ updatedId: dbProfiles.id });
//     return result;
// }

// export async function deleteProfile(profileId: number): Promise<boolean> {
//     const result = await db.delete(dbProfiles).where(eq(dbProfiles.id, profileId));
//     if (result.rows) {
//         return true;
//     }
//     return false;
// }