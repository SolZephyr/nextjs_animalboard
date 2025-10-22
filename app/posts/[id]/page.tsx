import { DynamicParams } from "@/lib/types";

export default async function Page({ params }: { params: DynamicParams }) {
    const { id } = await params;

    return (
        <h2>Post: {id}</h2>
    );
}