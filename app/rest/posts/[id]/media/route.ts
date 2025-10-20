import { PostsService } from "@/lib/service/posts";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id;
    const postId = parseInt(id) ?? -1;

    if (postId <= 0) {
        return new Response(JSON.stringify({ error: "Invalid post id" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const result = await PostsService().getPostMedia(postId);

    return new Response(JSON.stringify({ media: result }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}