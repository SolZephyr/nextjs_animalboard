"use client";

import ContentMain from "@/components/content-main";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    const navBack = () => {
        router.back();
    }

    return (
        <ContentMain>
            <section className="flex flex-col justify-center items-center border border-border rounded-md p-4">
                <h4>This page was not found</h4>
                <Button onClick={navBack} className="cursor-pointer m-5">Go back</Button>
            </section>
        </ContentMain>
    );
}