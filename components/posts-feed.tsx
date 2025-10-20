import PostsList, { PostsListLoading } from "./posts-list";
import { CardType } from "./post-item";
import { PostListParams } from "@/lib/types";
import { PostsService } from "@/lib/service/posts";
import { Suspense } from "react";

export default async function PostsFeed({ params, card }: { params: PostListParams, card?: CardType }) {

    const data = PostsService().getPosts(params);

    return (
        <section className="my-2">
            <Suspense fallback={<PostsListLoading />}>
                <PostsList data={data} card={card} />
            </Suspense>
        </section>
    );
}