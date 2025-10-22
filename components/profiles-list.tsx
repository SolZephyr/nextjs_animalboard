import { ProfileListParams } from "@/lib/types";
import { PaginationPaging } from "./pagination";
import ProfileItem, { ProfileItemSkeleton } from "./profile-item";
import { currentUser } from "@clerk/nextjs/server";
import { loginUserState } from "@/lib/utils";
import { ProfileService } from "@/lib/service/profiles";
import { Suspense } from "react";

export default async function ProfilesList({ params }: { params: ProfileListParams }) {

    const login = await currentUser();
    const userId = login ? await ProfileService().handleLoginUser(loginUserState(login)) : undefined;
    params.userId = userId;

    const result = await ProfileService().getProfiles(params);
    const paging = result.data?.meta;
    const profiles = result.data?.profiles ?? [];

    if (profiles.length <= 0) {
        return (<p>No profiles found...</p>);
    }
    return (
        <>
            <ul className="grid grid-cols-3 gap-4 justify-start items-start">
                {profiles.map(profile => (
                    <li key={profile.id}>
                        <ProfileItem profile={profile} />
                    </li>
                ))}
            </ul>
            <Suspense>
                <PaginationPaging params={paging} />
            </Suspense>
        </>
    );
}

export function ProfilesListLoading() {
    return (
        <ul className="grid grid-cols-3 gap-4 justify-start items-start">
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
        </ul>
    );
}