import ContentProfile from "@/components/content-profile";
import { DynamicParams, PostListParams, SearchParams } from "@/lib/types";

export default async function Page({ params, searchParams }: { params: DynamicParams, searchParams: SearchParams }) {
    const { id } = await params;
    const { page, sort, search } = await searchParams;
    const profileId = id ? Number(id) : -1;
    const postParams: PostListParams = {
        page: page ? parseInt(page.toString()) : 1,
        sort: sort ? sort.toString() : undefined,
        query: search ? search.toString() : undefined
    }

    return (
        <ContentProfile profileId={profileId} postParams={postParams} />
    );

}