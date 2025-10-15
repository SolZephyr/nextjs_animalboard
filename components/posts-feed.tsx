import { PostListResult } from "@/lib/types";
import PostsList from "./posts-list";
import { PaginationPaging } from "./pagination";

export default async function PostsFeed({ data }: { data: Promise<PostListResult> }) {

    const result = await data;
    const paging = result.data?.meta;
    const posts = result.data?.posts ?? [];

    return (
        <section>
            {posts ?
                <>
                    <PostsList posts={posts} />
                </>
                : <p>No data</p>
            }
            <PaginationPaging params={paging} />
        </section>
    );
}