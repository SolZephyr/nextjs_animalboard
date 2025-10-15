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
import { LimitOptions, PagingResult } from "@/lib/types";

export function PaginationPaging({ params }: { params: PagingResult | undefined }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);

    const limit = params?.limit ? (LimitOptions.includes(params.limit) ? params.limit : LimitOptions[0]) : 0;
    const total = params?.total ?? 0;
    const page = params?.page ?? 1;
    const pageEnd = Math.ceil(total / limit);

    const pageParams = (params: URLSearchParams, page: number): string => {
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };
    if(total <= limit) {
        // No pagination
        return (<></>);
    }

    return (
        <section className="flex flex-row justify-center items-center w-full p-2 border rounded-md gap-2 my-2">
            <Pagination className="">
                <PaginationContent>
                    {total > 0 && page > 1 ? (
                        <PaginationItem>
                            <PaginationPrevious
                                href={pageParams(urlParams, page - 1)}
                                className="rounded"
                            />
                        </PaginationItem>
                    ) : (
                        ""
                    )}
                    {
                        <PaginationItem key={page}>
                            <PaginationLink href={pageParams(urlParams, page)} className="text-black-500"> {page}</PaginationLink>
                        </PaginationItem>
                    }
                    {total > 0 && page < pageEnd ? (
                        <PaginationItem>
                            <PaginationNext
                                href={pageParams(urlParams, page + 1)}
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
