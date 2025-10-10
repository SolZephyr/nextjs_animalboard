import { Post } from "@/lib/types";
import PostItem from "./post-item";

export default async function PostsList({ data }: { data: Promise<Post[]> }) {

    const posts = await data;
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