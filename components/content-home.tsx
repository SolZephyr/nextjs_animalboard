import { PostListParams } from "@/lib/types";
import PostsFilter from "./posts-filter";
import Sidebar from "./sidebar";
import PostsFeed from "./posts-feed";

export default function ContentHome({ params }: { params: PostListParams }) {
    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <PostsFilter />
                <PostsFeed params={params} />
            </main>
            <Sidebar />
        </div>
    );
}