import { Suspense } from "react";
import PostContent from "./post-content";
import Sidebar from "./sidebar";

export default function ContentPost({ postId }: { postId: number }) {
    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <PostContent postId={postId} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}