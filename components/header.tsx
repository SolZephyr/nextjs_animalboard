import { Cat } from "lucide-react";
import SearchBar from "./searchbar";
import HeaderUser from "./header-user";
import { Suspense } from "react";
import Link from "next/link";
import { SidebarMobile } from "./sidebar";

function Icon() {
    return <Cat className="w-10 h-10 mr-2" width={40} height={40} />;
}

export default function Header() {

    return (
        <header className="content-grid fixed top-[0] left-[0] right-[0] z-999 w-full h-(--header-height) bg-gray-100">
            <section className="flex flex-row items-center justify-between h-full border border-red-500 text-black p-2">
                <div>
                    <Link href={`/`} className="hidden sm:flex flex-row items-center cursor-pointer mr-2 hover:stroke-blue-500 hover:text-blue-500">
                        <Icon />
                        <h1 className="text-2xl font-bold">PET•PROJECT</h1>
                    </Link>
                    <SidebarMobile trigger={
                        <button className="flex flex-row items-center cursor-pointer hover:stroke-blue-500 hover:text-blue-500"><Icon /></button>
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