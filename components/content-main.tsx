import { SidebarDefault } from "./sidebar";

export default function ContentMain({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className="grid grid-content-main">
            <main className={`grid-area-content grid grid-cols-1 ${className ?? 'content-start'} min-h-(--sidebar-height) pt-2 md:p-2 md:pr-0`}>
                {children}
            </main>
            <SidebarDefault />
        </div>
    );
}