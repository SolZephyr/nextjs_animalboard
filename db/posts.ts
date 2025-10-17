import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { and, asc, count, desc, eq, getTableColumns, ilike, or } from 'drizzle-orm';
import { dbMedia, dbPosts, dbProfiles } from './schema';
import { ImportPost, Media, Post, PostListParams, PostListResult, Profile, ProfileListParams } from '@/lib/types';
import { createMediaMultiple, createPostMedia, readMediaByPost } from './media';
import { readProfiles } from './profiles';

const db = drizzle(process.env.DATABASE_URL!);

export async function createPost(post: Post): Promise<number> {
    // Post media
    const images = post.images?.length ? await createMediaMultiple(post.images) : undefined;

    const data: typeof dbPosts.$inferInsert = {
        type: post.type,
        title: post.title,
        content: post.content,
        profileId: post.profile?.id ?? post.profileId,
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
    post.profile = profile;
    return createPost(post);
}

export async function readPosts(params: PostListParams): Promise<PostListResult> {
    try {
        const limit = params?.limit ?? 10;
        const page = params?.page ?? 1;
        const offset = (page - 1) * limit;
        let where = undefined;
        let order = desc(dbPosts.created);
        if (params.query || params.profileId) {
            const exp1 = params.query ? or(
                ilike(dbPosts.title, `%${params.query}%`),
                ilike(dbPosts.content, `%${params.query}%`),
                ilike(dbProfiles.name, `%${params.query}%`),
                ilike(dbProfiles.user, `%${params.query}%`)
            ) : undefined;
            const exp2 = params.profileId ? eq(dbPosts.profileId, params.profileId) : undefined;
            where = and(exp1, exp2);
        }
        console.log(params.sort);
        if (params.sort) {
            switch (params.sort) {
                case "oldest":
                    order = asc(dbPosts.created);
                    break;
                case "popular":
                    // TODO: Count likes
                    break;
            }
        }
        const total = await db.select({ count: count(dbPosts.id) }).from(dbPosts)
            .leftJoin(dbProfiles, eq(dbPosts.profileId, dbProfiles.id))
            .leftJoin(dbMedia, eq(dbProfiles.avatarId, dbMedia.id))
            .where(where);
        const data = await db.select({ post: { ...getTableColumns(dbPosts) }, profile: dbProfiles, avatar: dbMedia })
            .from(dbPosts)
            .leftJoin(dbProfiles, eq(dbPosts.profileId, dbProfiles.id))
            .leftJoin(dbMedia, eq(dbProfiles.avatarId, dbMedia.id))
            .where(where)
            .orderBy(order)
            .limit(limit)
            .offset(offset);
        const repacked = [];
        for (const dt of data) {
            const list = await readMediaByPost(dt.post.id);
            repacked.push(repackPost(dt, list));
        }
        return {
            data: {
                posts: repacked,
                meta: {
                    page: page,
                    limit: limit,
                    total: total[0].count ?? 0
                }
            }
        }
    } catch (err) {
        console.error(err);
        return { error: "Error reading posts." }
    }
}

function repackPost(data: {
    profile: {
        created: Date;
        updated: Date | null;
        id: number;
        name: string;
        nicknames: string;
        user: string;
        avatarId: number | null;
        animal: string;
        breed: string;
        country: string;
        home: string;
        about: string;
        dateOfBirth: Date | null;
    } | null;
    avatar: {
        created: Date;
        updated: Date | null;
        id: number;
        type: string;
        source: string;
    } | null;
    post: {
        created: Date;
        updated: Date | null;
        id: number;
        type: string;
        title: string;
        content: string;
        profileId: number | null
    }
}, media: Media[] | null) {
    const avatar = data.avatar ? {
        id: data.avatar?.id,
        type: data.avatar?.type,
        source: data.avatar?.source,
        created: data.avatar?.created,
        updated: data.avatar?.updated
    } : null;
    const profile: Profile | null = data.profile ? {
        ...data.profile, avatar: avatar
    } : null;
    return { profile: profile, ...data.post, images: (media ? media : undefined) };
}

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