import ContentPost from "@/components/content-post";
import { DynamicParams } from "@/lib/types";

export default async function Page({ params }: { params: DynamicParams }) {
    const { id } = await params;
    const postId = id ? Number(id) : -1;

    return (
        <ContentPost postId={postId} />
    );
}