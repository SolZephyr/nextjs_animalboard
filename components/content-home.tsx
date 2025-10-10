import getPosts from "@/lib/data/posts.json";
import { Post } from "@/lib/types";
import PostsList from "./posts-list";
import { Suspense } from "react";

export default function ContentHome() {

    // Test promise data
    const data = new Promise<Post[]>(function (resolve) {
        const posts: Post[] = getPosts ?? [];
        resolve(posts);
    });

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content">
                <section>
                    <Suspense fallback={<p>Loading...</p>}>
                        <PostsList data={data} />
                    </Suspense>
                </section>
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