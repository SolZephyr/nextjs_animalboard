import Sidebar from "./sidebar";

export default function ContentPost({ postId }: { postId: number }) {
    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <h2>Post: {postId}</h2>
            </main>
            <Sidebar />
        </div>
    );
}