import { PostListResult } from "@/lib/types";
import PostsList from "./posts-list";
import { PaginationPaging } from "./pagination";
import { CardType } from "./post-item";

export default async function PostsFeed({ data, card }: { data: Promise<PostListResult>, card?: CardType }) {

    const result = await data;
    const paging = result.data?.meta;
    const posts = result.data?.posts ?? [];

    return (
        <section>
            {posts ? <PostsList posts={posts} card={card} /> : <p>No data</p>
            }
            <PaginationPaging params={paging} />
        </section>
    );
}