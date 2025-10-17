import { PostListParams } from "@/lib/types";
import { Suspense } from "react";
import PostsFilter from "./posts-filter";
import Sidebar from "./sidebar";
import PostsFeed from "./posts-feed";
import { PostsService } from "@/lib/service/posts";

export default function ContentHome({ params }: { params: PostListParams }) {

    const data = PostsService().getPosts(params);

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