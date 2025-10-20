import { ProfileListResult } from "@/lib/types";
import { PaginationPaging } from "./pagination";
import ProfileItem, { ProfileItemSkeleton } from "./profile-item";

export default async function ProfilesList({ data }: { data: Promise<ProfileListResult> }) {

    const result = await data;
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
            <PaginationPaging params={paging} />
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