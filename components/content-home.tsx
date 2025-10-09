import getPosts from "@/lib/data/posts.json";
import { Post } from "@/lib/types";

export default function ContentHome() {

    const posts: Post[] = getPosts ?? [];

    return (
        <div className="full-width text-black">
            <section className="py-4 grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
                <aside className="hidden md:block bg-white border border-red-500">
                    Sidebar
                </aside>
                <ul className="grid grid-cols-1 auto-rows-min gap-4 border border-red-500">
                    {posts.map(post => (
                        <li key={post.id}>
                            <article className="bg-white border rounded-md p-4">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row">
                                        <div className="w-10 h-10 border border-red-500 mr-2"></div>
                                        <p>{post.profile.name}</p>
                                    </div>
                                    <aside>
                                        <p>{post.profile.user}</p>
                                        <p>{post.created}</p>
                                    </aside>
                                </div>
                                <h2 className="text-xl font-bold">{post.title}</h2>
                                <p>{post.content}</p>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}