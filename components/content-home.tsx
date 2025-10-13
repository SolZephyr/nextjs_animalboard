import getPosts from "@/lib/data/posts.json";
import { Post } from "@/lib/types";
import PostsList from "./posts-list";
import { Suspense } from "react";
import { PostsFilter } from "./posts-filter";
import { PaginationPaging } from "./pagination";

export default function ContentHome() {

    // Test promise data
    const data = new Promise<Post[]>(function (resolve) {
        const posts: Post[] = getPosts ?? [];
        resolve(posts);
    });

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 ml-2">
                <PostsFilter />
                <section>
                    <Suspense fallback={<p>Loading...</p>}>
                        <PostsList data={data} />
                    </Suspense>
                </section>
                <PaginationPaging page={1} limit={10} total={10} />
            </main>
            <aside className="grid-area-sidebar hidden md:block max-h-full w-50 border border-red-500">
                <section className="max-h-(--sidebar-height) bg-white sticky top-(--header-height)">
                    <ul>
                        <li>Sidebar</li>
                        <li>Sidebar</li>
                        <li>Sidebar</li>
                    </ul>
                </section>
            </aside>
        </div>
    );
}