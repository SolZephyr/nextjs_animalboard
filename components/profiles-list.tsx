import { ProfileListResult } from "@/lib/types";
import { PaginationPaging } from "./pagination";
import ProfileItem, { ProfileItemSkeleton } from "./profile-item";

export default async function ProfilesList({ data }: { data: Promise<ProfileListResult> }) {

    const result = await data;
    const paging = result.data?.meta;
    const profiles = result.data?.profiles ?? [];

    return (
        <section>
            {profiles ?
                <ul className="grid grid-cols-3 gap-4 justify-start items-start">
                    {profiles.map(profile => (
                        <li key={profile.id}>
                            <ProfileItem profile={profile} />
                        </li>
                    ))}
                </ul>
                : <p>No data</p>
            }
            <PaginationPaging params={paging} />
        </section>
    );
}

export function ProfilesListLoading() {
    return (
        <section>
            <ul className="grid grid-cols-3 gap-4 justify-start items-start">
                <ProfileItemSkeleton />
                <ProfileItemSkeleton />
                <ProfileItemSkeleton />
            </ul>
        </section>
    );
}