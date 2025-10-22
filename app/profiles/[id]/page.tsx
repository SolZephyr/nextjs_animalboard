import ContentMain from "@/components/content-main";
import ProfileContent, { ProfileContentSkeleton } from "@/components/profile-content";
import { ProfileService } from "@/lib/service/profiles";
import { DynamicParams, PostListParams, SearchParams } from "@/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: DynamicParams }): Promise<Metadata> {
    const { id } = await params;
    const profileId = id ? Number(id) : -1;

    const profile = await ProfileService().getProfile(profileId);
    if (!profile) {
        return notFound();
    }
    return {
        title: `Profile: ${profile.name}`,
        description: `Pet Project: Checking out ${profile.name}`
    }
}

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