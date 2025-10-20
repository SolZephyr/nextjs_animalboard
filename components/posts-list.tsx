import { Post } from "@/lib/types";
import PostItem, { CardType, PostItemLoading, ProfilePostItem, ProfilePostItemLoading } from "./post-item";

export default function PostsList({ posts, card }: { posts: Post[], card?: CardType }) {

    return (
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