import ContentMain from "@/components/content-main";
import ProfileContent, { ProfileContentSkeleton } from "@/components/profile-content";
import { DynamicParams, PostListParams, SearchParams } from "@/lib/types";
import { Suspense } from "react";

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
        <ContentMain>
            <Suspense fallback={<ProfileContentSkeleton />}>
                <ProfileContent profileId={profileId} postParams={postParams} />
            </Suspense>
        </ContentMain>
    );

}