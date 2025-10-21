import PostsList, { PostsListLoading } from "./posts-list";
import { CardType } from "./post-item";
import { PostListParams } from "@/lib/types";
import { Suspense } from "react";

export default async function PostsFeed({ params, card }: { params: PostListParams, card?: CardType }) {
    return (
        <section className="my-2">
            <Suspense fallback={<PostsListLoading />}>
                <PostsList params={params} card={card} />
            </Suspense>
        </section>
    );
}