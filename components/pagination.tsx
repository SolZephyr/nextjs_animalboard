"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import { LimitOptions } from "@/lib/types";

type Props = { page: number; limit: number; total: number };

export function PaginationPaging({
    page = 1,
    limit = LimitOptions[0],
    total = 0,
}: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    limit = LimitOptions.includes(limit) ? limit : LimitOptions[0];
    const pageEnd = Math.ceil(total / limit);

    const pageParams = (params: URLSearchParams, page: number): string => {
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <section className="flex flex-row justify-center items-center w-full p-2 border rounded-md gap-2 my-4">
            <Pagination className="">
                <PaginationContent>
                    {total > 0 && page > 1 ? (
                        <PaginationItem>
                            <PaginationPrevious
                                href={pageParams(params, page - 1)}
                                className="rounded"
                            />
                        </PaginationItem>
                    ) : (
                        ""
                    )}
                    {
                        <PaginationItem key={page}>
                            <PaginationLink href={pageParams(params, page)} className="text-black-500"> {page}</PaginationLink>
                        </PaginationItem>
                    }
                    {total > 0 && page < pageEnd ? (
                        <PaginationItem>
                            <PaginationNext
                                href={pageParams(params, page + 1)}
                                className="rounded"
                            />
                        </PaginationItem>
                    ) : (
                        ""
                    )}
                </PaginationContent>
            </Pagination>
        </section>
    );
}
