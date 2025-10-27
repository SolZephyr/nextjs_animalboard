import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { and, asc, count, desc, eq, getTableColumns, ilike, or, sql } from 'drizzle-orm';
import { dbMedia, dbPosts, dbProfiles, dbUserPostLikes, dbUserProfileFavourites } from './schema';
import { ImportPost, Media, Post, PostListParams, PostListResult, Profile, ProfileListParams } from '@/lib/types';
import { createMediaMultiple, createPostMedia, readMediaByPost } from './media';
import { readProfiles } from './profiles';

const db = drizzle(process.env.DATABASE_URL!);

export async function createPost(post: Post): Promise<number> {

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

export async function createPostLike(postId: number, userId: number): Promise<number> {
    const data: typeof dbUserPostLikes.$inferInsert = {
        userId: userId,
        postId: postId
    };
    return (await db.insert(dbUserPostLikes).values(data)).rowCount ?? 0;
}

export async function readPosts(params: PostListParams): Promise<PostListResult> {
    try {
        const userId = params?.userId ?? 0;
        const limit = params?.limit ?? 10;
        const page = params?.page ?? 1;
        const offset = (page - 1) * limit;
        let where = undefined;
        let order = [desc(dbPosts.created)];
        if (params.query || params.profileId || params.filter) {
            const exp1 = params.query ? or(
                ilike(dbPosts.title, `%${params.query}%`),
                ilike(dbPosts.content, `%${params.query}%`),
                ilike(dbProfiles.name, `%${params.query}%`),
                ilike(dbProfiles.user, `%${params.query}%`)
            ) : undefined;
            const exp2 = params.profileId ? eq(dbPosts.profileId, params.profileId) : undefined;
            where = and(exp1, exp2);
        }
        if (params.sort) {
            switch (params.sort) {
                case "oldest":
                    order = [asc(dbPosts.created)];
                    break;
                case "popular":
                    order = [desc(sql`likes`), desc(dbPosts.created)]
                    break;
            }
        }

        const total = db.select({ count: count(dbPosts.id) })
            .from(dbPosts)
            .innerJoin(dbProfiles, eq(dbPosts.profileId, dbProfiles.id));
        const select = db.select({
            post: { ...getTableColumns(dbPosts) },
            profile: dbProfiles,
            avatar: dbMedia,
            likes: db.$count(dbUserPostLikes, eq(dbUserPostLikes.postId, dbPosts.id)).as('likes'),
            isLiked: db.$count(dbUserPostLikes, and(eq(dbUserPostLikes.postId, dbPosts.id), eq(dbUserPostLikes.userId, userId)))
        })
            .from(dbPosts)
            .innerJoin(dbProfiles, eq(dbPosts.profileId, dbProfiles.id))
            .leftJoin(dbMedia, eq(dbMedia.id, dbProfiles.avatarId));
        if (params?.filter === "favourites") {
            total.innerJoin(dbUserProfileFavourites, and(eq(dbUserProfileFavourites.profileId, dbProfiles.id), eq(dbUserProfileFavourites.userId, userId)));
            select.innerJoin(dbUserProfileFavourites, and(eq(dbUserProfileFavourites.profileId, dbProfiles.id), eq(dbUserProfileFavourites.userId, userId)));
        }
        total.where(where);
        select.where(where)
            .orderBy(...order)
            .limit(limit)
            .offset(offset);
        const dataTotal = await total;
        const dataSelect = await select;

        const repacked = [];
        for (const dt of dataSelect) {
            const list = await readMediaByPost(dt.post.id);
            repacked.push(repackPost({ data: dt, media: list }));
        }
        return {
            data: {
                posts: repacked,
                meta: {
                    page: page,
                    limit: limit,
                    total: dataTotal[0].count ?? 0
                }
            }
        }
    } catch (err) {
        console.error(err);
        return { error: "Error reading posts." }
    }
}

export async function readPost(id: number, userId?: number): Promise<Post | null> {
    userId = userId ?? 0;
    const data = await db.select(
        {
            post: { ...getTableColumns(dbPosts) },
            profile: dbProfiles,
            avatar: dbMedia,
            likes: db.$count(dbUserPostLikes, eq(dbUserPostLikes.postId, dbPosts.id)).as('likes'),
            isLiked: db.$count(dbUserPostLikes, and(eq(dbUserPostLikes.postId, dbPosts.id), eq(dbUserPostLikes.userId, userId)))
        })
        .from(dbPosts)
        .innerJoin(dbProfiles, eq(dbPosts.profileId, dbProfiles.id))
        .leftJoin(dbMedia, eq(dbMedia.id, dbProfiles.avatarId))
        .where(eq(dbPosts.id, id))
        .limit(1)
        .offset(0);
    if (data.length <= 0) {
        return null;
    }
    const list = await readMediaByPost(data[0].post.id);
    const repacked = repackPost({ data: data[0], media: list });
    return repacked;
}

export async function readPostLikes(postId: number, userId?: number): Promise<{ userId: number; postId: number; }[]> {
    const withUser = userId ? eq(dbUserPostLikes.userId, userId) : undefined;
    const where = and(eq(dbUserPostLikes.postId, postId), withUser);
    const result = await db.select()
        .from(dbUserPostLikes)
        .where(where);
    return result;
}

function repackPost({ data, media }: {
    data: {
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
        likes?: number;
        isLiked?: number;
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
        };
    }, media?: Media[] | null
}) {
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
    const post: Post = {
        ...data.post,
        likes: data.likes ?? 0,
        isLiked: data.isLiked ?? 0,
        profile: profile,
        images: (media ? media : undefined)
    }
    return post;
}

export async function deletePostLike(postId: number, userId: number): Promise<number> {
    const result = await db.delete(dbUserPostLikes).where(and(eq(dbUserPostLikes.postId, postId), eq(dbUserPostLikes.userId, userId))).returning();
    return result.length;
}