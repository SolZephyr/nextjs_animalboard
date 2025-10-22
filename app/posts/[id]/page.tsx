import ContentMain from "@/components/content-main";
import PostContent, { PostContentSkeleton } from "@/components/post-content";
import { PostsService } from "@/lib/service/posts";
import { DynamicParams } from "@/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: DynamicParams }): Promise<Metadata> {
    const { id } = await params;
    const postId = id ? Number(id) : -1;

    const post = await PostsService().getPost(postId);
    if (!post) {
        return notFound();
    }
    return {
        title: `Post: ${post.title}`,
        description: `Pet Project: News on ${post.profile?.name}`
    }
}

export default async function Page({ params }: { params: DynamicParams }) {
    const { id } = await params;
    const postId = id ? Number(id) : -1;

    return (
        <ContentMain>
            <Suspense fallback={<PostContentSkeleton />}>
                <PostContent postId={postId} />
            </Suspense>
        </ContentMain>
    );
}