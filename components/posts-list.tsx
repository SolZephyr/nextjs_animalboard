import { Post } from "@/lib/types";
import PostItem from "./post-item";

export default function PostsList({ posts }: { posts: Post[] }) {
    return (
        <ul className="grid grid-cols-1 auto-rows-min gap-4">
            {posts.map(post => (
                <li key={post.id}>
                    <PostItem post={post}></PostItem>
                </li>
            ))}
        </ul>
    );
}