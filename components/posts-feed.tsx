import { PostListResult } from "@/lib/types";
import PostsList from "./posts-list";
import { PaginationPaging } from "./pagination";

export default async function PostsFeed({ data }: { data: Promise<PostListResult> }) {
    const result = await data;
    return (
        <section>
            <PostsList posts={result.posts} />
            <PaginationPaging params={result} />
        </section>
    );
}