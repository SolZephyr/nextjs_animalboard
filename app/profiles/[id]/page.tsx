import { DynamicParams } from "@/lib/types";

export default async function Page({ params }: { params: DynamicParams }) {
    const { id } = await params;
    const profileId = id ? Number(id) : -1;

    return (
        <h2>Profile: ${profileId}</h2>
    );

}