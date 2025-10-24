import { Cat } from "lucide-react";
import SearchBar from "./searchbar";
import HeaderUser from "./header-user";
import { Suspense } from "react";
import Link from "next/link";
import { SidebarMobile } from "./sidebar";

function Icon() {
    return <Cat className="w-10 h-10" width={40} height={40} />;
}

export default function Header() {
    return (
        <header className="content-grid fixed top-[0] left-[0] right-[0] z-999 w-full h-(--header-height) bg-accent text-accent-foreground border border-b-border">
            <section className="flex flex-row items-center justify-between h-full border border-transparent p-2">
                <div className="mr-2">
                    <Link href={`/`} className="sr-only sm:not-sr-only sm:flex flex-row items-center cursor-pointer text-logo-border stroke-logo-border fill-logo-full hover:text-logo-accent-border hover:stroke-logo-accent-border hover:fill-logo-accent-full">
                        <Icon />
                        <h1 className="text-2xl font-semibold">PET•PROJECT</h1>
                    </Link>
                    <SidebarMobile trigger={
                        <button className="flex flex-row items-center cursor-pointer text-logo-border stroke-logo-border fill-logo-full hover:text-logo-accent-border hover:stroke-logo-accent-border hover:fill-logo-accent-full"><span className="sr-only">Menu</span><Icon /></button>
                    } />
                </div>
                <Suspense>
                    <SearchBar />
                </Suspense>
                <HeaderUser />
            </section>
        </header>
    );
}