import Sidebar from "./sidebar";

export default function ContentMain({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className="grid grid-content-home">
            <main className={`grid-area-content grid grid-cols-1 ${className ?? 'content-start'} min-h-(--sidebar-height) p-2 pr-0`}>
                {children}
            </main>
            <Sidebar />
        </div>
    );
}