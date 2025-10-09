import getPosts from "@/lib/data/posts.json";
import { Post } from "@/lib/types";
import PostsList from "./posts-list";

export default function ContentHome() {

    // Test promise data
    const data = new Promise<Post[]>(function (resolve) {
        const posts: Post[] = getPosts ?? [];
        resolve(posts);
    });

    return (
        <div className="full-width text-black">
            <section className="py-4 grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
                <aside className="hidden md:block bg-white border border-red-500">
                    Sidebar
                </aside>
                <PostsList data={data} />
            </section>
        </div>
    );
}