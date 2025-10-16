import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { dbMedia } from './schema';
import { Media } from '@/lib/types';

const db = drizzle(process.env.DATABASE_URL!);

export async function createMedia(media: Media): Promise<number> {
    const data: typeof dbMedia.$inferInsert = {
        type: media.type,
        source: media.source,
        created: new Date(),
        updated: new Date()
    };
    const result = await db.insert(dbMedia).values(data).returning({ insertedId: dbMedia.id });
    return (result[0]?.insertedId ?? null);
}