import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { dbMedia, dbMediaToPost } from './schema';
import { Media } from '@/lib/types';
import { eq, getTableColumns } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function createMedia(media: Media): Promise<number> {
    const data: typeof dbMedia.$inferInsert = {
        type: media.type,
        source: media.source,
        created: media.created ?? new Date(),
        updated: null
    };
    const result = await db.insert(dbMedia).values(data).returning({ insertedId: dbMedia.id });
    return (result[0]?.insertedId ?? null);
}

export async function createMediaMultiple(media: Media[]): Promise<number[]> {
    const data: typeof dbMedia.$inferInsert[] = [];
    for (const item of media) {
        const dataItem: typeof dbMedia.$inferInsert = {
            type: item.type,
            source: item.source,
            created: item.created ?? new Date(),
            updated: null
        };
        data.push(dataItem);
    }
    const result = await db.insert(dbMedia).values(data).returning({ insertedId: dbMedia.id });
    return result.map(item => (item.insertedId));
}

export async function createPostMedia(postId: number, media: number[]): Promise<number> {
    const data: typeof dbMediaToPost.$inferInsert[] = [];
    for (const mediaId of media) {
        const dataItem: typeof dbMediaToPost.$inferInsert = {
            postId: postId,
            mediaId: mediaId
        };
        data.push(dataItem);
    }
    const result = await db.insert(dbMediaToPost).values(data).returning();
    return result.length;
}

export async function readMediaByPost(postId: number): Promise<Media[] | null> {
    try {
        const where = eq(dbMediaToPost.postId, postId);
        const order = dbMedia.created;
        const data = await db.select({ media: { ...getTableColumns(dbMedia) } })
            .from(dbMediaToPost)
            .innerJoin(dbMedia, eq(dbMediaToPost.mediaId, dbMedia.id))
            .where(where)
            .orderBy(order);
        return data.map(dt => (dt.media));
    } catch (err) {
        console.error(err);
        return null;
    }
}