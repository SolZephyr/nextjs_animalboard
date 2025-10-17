"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";

export default function PostsFilter() {
    const SORT_DEFAULT = "latest";
    const FILTER_DEFAULT = "all";

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);
    const sort = searchParams.get("sort") ?? SORT_DEFAULT;
    const filter = searchParams.get("filter") ?? FILTER_DEFAULT;

    function onSortChange(e: string): void {
        if (e !== SORT_DEFAULT)
            urlParams.set("sort", e);
        else
            urlParams.delete("sort");
        replace(`${pathname}?${urlParams.toString()}`);
    }

    function onFilterChange(e: string): void {
        if (e !== FILTER_DEFAULT)
            urlParams.set("filter", e);
        else
            urlParams.delete("filter");
        replace(`${pathname}?${urlParams.toString()}`);
    }

    return (
        <section className="flex flex-row">
            <Select defaultValue={sort} onValueChange={(e) => onSortChange(e)}>
                <SelectTrigger className="w-30 cursor-pointer">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue={filter} onValueChange={(e) => onFilterChange(e)}>
                <SelectTrigger className="w-30 mx-2 cursor-pointer">
                    <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
            </Select>
        </section>
    );
}

export function ProfilePostsFilter() {
    const SORT_DEFAULT = "latest";

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);
    const sort = searchParams.get("sort") ?? SORT_DEFAULT;

    function onSortChange(e: string): void {
        if (e !== SORT_DEFAULT)
            urlParams.set("sort", e);
        else
            urlParams.delete("sort");
        replace(`${pathname}/?${urlParams.toString()}`);
    }

    return (
        <section className="flex flex-row">
            <Select defaultValue={sort} onValueChange={(e) => onSortChange(e)}>
                <SelectTrigger className="w-30 cursor-pointer">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
            </Select>
        </section>
    );
}