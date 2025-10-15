import getPosts from "@/lib/data/posts.json";
import { Post, PostListParams, PostListResult } from "@/lib/types";
import { Suspense } from "react";
import { PostsFilter } from "./posts-filter";
import Sidebar from "./sidebar";
import PostsFeed from "./posts-feed";

export default function ContentHome({ params }: { params: PostListParams }) {

    // Test promise data
    const data = new Promise<PostListResult>(function (resolve) {
        const posts: Post[] = getPosts ?? [];
        const data: PostListResult = {
            data: {
                posts: posts,
                meta: {
                    page: params.page,
                    limit: 10,
                    total: 10
                }
            }
        }
        resolve(data);
    });

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <PostsFilter />
                <Suspense fallback={<p>Loading...</p>}>
                    <PostsFeed data={data} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}