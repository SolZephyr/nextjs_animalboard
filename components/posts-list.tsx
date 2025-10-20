import { PostListResult } from "@/lib/types";
import PostItem, { CardType, PostItemLoading, ProfilePostItem, ProfilePostItemLoading } from "./post-item";
import { PaginationPaging } from "./pagination";

export default async function PostsList({ data, card }: { data: Promise<PostListResult>, card?: CardType }) {

    const result = await data;
    const paging = result.data?.meta;
    const posts = result.data?.posts ?? [];

    return (
        <>
            <ul className="grid grid-cols-1 auto-rows-min gap-4">
                {posts.map(post => (
                    <li key={post.id}>
                        {(card && card === CardType.Profile) ?
                            <ProfilePostItem post={post} />
                            :
                            <PostItem post={post} />
                        }
                    </li>
                ))}
            </ul>
            <PaginationPaging params={paging} />
        </>
    );
}

export function PostsListLoading({ card }: { card?: CardType }) {
    if (card && card === CardType.Profile) {
        return (
            <ul className="grid grid-cols-1 auto-rows-min gap-4">
                <ProfilePostItemLoading />
            </ul>
        );
    } else {
        return (
            <ul className="grid grid-cols-1 auto-rows-min gap-4">
                <PostItemLoading />
            </ul>
        );
    }
}