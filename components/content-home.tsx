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
        <div className="text-black py-4 grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
            <aside className="hidden md:block bg-white border border-red-500">
                <section>
                    Sidebar
                </section>
            </aside>
            <section>
                <Suspense fallback={<p>Loading...</p>}>
                    <PostsList data={data} />
                </Suspense>
            </section>
        </div>
    );
}