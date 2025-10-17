import { Cat } from "lucide-react";
import SearchBar from "./searchbar";

export default function Header() {

    return (
        <header className="content-grid fixed top-[0] left-[0] right-[0] z-999 w-full h-(--header-height) bg-white">
            <section className="flex flex-row items-center justify-between border border-red-500 text-black p-2">
                <div className="flex flex-row items-center">
                    <Cat className="w-10 h-10 mr-1"/>
                    <h1 className="hidden md:block text-xl">PET-PROJECT</h1>
                </div>
                <SearchBar />
                <button className="border border-red-500 w-10 h-10 hover:bg-black hover:text-white"></button>
            </section>
        </header>
    );
}