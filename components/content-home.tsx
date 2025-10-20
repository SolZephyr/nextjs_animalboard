import { PostListParams } from "@/lib/types";
import { Suspense } from "react";
import PostsFilter from "./posts-filter";
import Sidebar from "./sidebar";
import PostsFeed from "./posts-feed";
import { PostsService } from "@/lib/service/posts";
import { PostsListLoading } from "./posts-list";

export default function ContentHome({ params }: { params: PostListParams }) {

    const data = PostsService().getPosts(params);

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <PostsFilter />
                <section className="my-2">
                    <Suspense fallback={<PostsListLoading />}>
                        <PostsFeed data={data} />
                    </Suspense>
                </section>
            </main>
            <Sidebar />
        </div>
    );
}