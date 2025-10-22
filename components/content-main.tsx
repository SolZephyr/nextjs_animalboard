import Sidebar from "./sidebar";

export default function ContentMain({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                {children}
            </main>
            <Sidebar />
        </div>
    );
}