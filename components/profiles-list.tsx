import { ProfileListResult } from "@/lib/types";
import { PaginationPaging } from "./pagination";

export default async function ProfilesList({ data }: { data: Promise<ProfileListResult> }) {

    const result = await data;
    const paging = result.data?.meta;
    const profiles = result.data?.profiles ?? [];

    return (
        <section>
            {profiles ?
                <ul className="grid grid-cols-3 justify-start items-start">
                    {profiles.map(profile => (
                        <li key={profile.id}>{profile.name}</li>
                    ))}
                </ul>
                : <p>No data</p>
            }
            <PaginationPaging params={paging} />
        </section>
    );
}