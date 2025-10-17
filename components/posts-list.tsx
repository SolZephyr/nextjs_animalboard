import { Post } from "@/lib/types";
import PostItem, { CardType, ProfilePostItem } from "./post-item";

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