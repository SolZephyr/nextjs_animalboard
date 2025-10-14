import { ProfileListResult } from "@/lib/types";

export default async function ProfilesList({ data }: { data: Promise<ProfileListResult> | null }) {

    const result = await data;
    const profiles = result?.profiles ?? [];

    return (
        <section>
            <ul className="grid grid-cols-3 justify-start items-start">
                {profiles.map(profile => (
                    <li key={profile.id}>{profile.name}</li>
                ))}
            </ul>
        </section>
    );
}