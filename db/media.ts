import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { dbMedia, mediaToPost } from './schema';
import { Media } from '@/lib/types';

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
    const data: typeof mediaToPost.$inferInsert[] = [];
    for (const mediaId of media) {
        const dataItem: typeof mediaToPost.$inferInsert = {
            postId: postId,
            mediaId: mediaId
        };
        data.push(dataItem);
    }
    const result = await db.insert(mediaToPost).values(data).returning();
    return result.length;
}