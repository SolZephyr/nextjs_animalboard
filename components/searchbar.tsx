"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {

    const [query, setQuery] = useState("");
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setQuery(value);
    }

    const onSearch = () => {
        params.delete("page");
        if (query) {
            params.set("search", query);
        } else {
            params.delete("query");
        }
        if (pathname.startsWith("/profiles/")) {
            // Search under specific profile
            replace(`${pathname}?${params.toString()}`);
        } else if (pathname.startsWith("/profiles")) {
            // Search under all profiles
            replace(`${pathname}?${params.toString()}`);
        } else if (pathname.startsWith("/about")) {
            // Search under about(?)
            replace(`${pathname}?${params.toString()}`);
        } else if (pathname === "/") {
            // Search all posts
            replace(`${pathname}?${params.toString()}`);
        } else {
            // Do nothing
        }
    }

    return (
        <form className="grid grid-cols-1">
            <input type="text" name="search" id="search" placeholder="Search..." className="border border-border rounded-xl col-span-full row-span-full p-2 pl-5 text-xl" onChange={onChange} />
            <button type="button" onClick={onSearch} className="btn-search col-span-full row-span-full m-1 ml-auto text-black hover:text-white hover:bg-black p-2 rounded-xl cursor-pointer"><Search /></button>
        </form>
    );
}