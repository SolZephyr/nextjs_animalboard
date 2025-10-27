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
            params.delete("search");
        }
        if (pathname.startsWith("/profiles/")) {
            replace(`${pathname}?${params.toString()}`);
        } else if (pathname.startsWith("/profiles")) {
            replace(`${pathname}?${params.toString()}`);
        } else if (pathname.startsWith("/about")) {
            replace(`${pathname}?${params.toString()}`);
        } else if (pathname === "/") {
            replace(`${pathname}?${params.toString()}`);
        }
    }

    return (
        <form className="grid grid-cols-1">
            <label htmlFor="search" className="sr-only">Context search</label>
            <input type="text" name="search" id="search" placeholder="Search..." className="border border-border rounded-xl bg-input text-foreground col-span-full row-span-full p-2 pl-5 text-xl" onChange={onChange} />
            <button type="button" onClick={onSearch} className="btn-search col-span-full row-span-full m-1 ml-auto bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-xl cursor-pointer"><span className="sr-only">Search</span><Search /></button>
        </form>
    );
}