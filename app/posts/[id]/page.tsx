import ContentMain from "@/components/content-main";
import PostContent, { PostContentSkeleton } from "@/components/post-content";
import { DynamicParams } from "@/lib/types";
import { Suspense } from "react";

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