import { SidebarDefault } from "./sidebar";

export default function ContentMain({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className="grid grid-content-main grid-cols-(--main-col-full) sm:grid-cols-(--main-col-aside)">
            <main className={`grid grid-cols-1 ${className ?? 'content-start'} w-full min-h-(--sidebar-height) pt-2 sm:p-2 sm:pr-0`}>
                {children}
            </main>
            <SidebarDefault />
        </div>
    );
}