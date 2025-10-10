import { Post } from "@/lib/types";

export default async function PostsList({ data }: { data: Promise<Post[]> }) {

    const posts = await data;
    return (
        <ul className="grid grid-cols-1 auto-rows-min gap-4">
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
    );
}