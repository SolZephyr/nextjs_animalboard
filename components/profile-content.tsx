import { Profile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ProfileTag } from "./tags";

export default async function ProfileContent({ data }: { data: Promise<Profile | null> }) {
    const profile = await data;
    if (!profile) {
        return (
            <p>Not found</p>
        );
    }

    return (
        <>
            <article className="p-4 border border-border rounded-md">
                <h2 className="hidden">Profile</h2>
                <section className="py-4 flex flex-row">
                    <Avatar className="size-30 border border-black">
                        <AvatarImage src={profile.avatar} className="rounded-full" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <aside className="flex flex-col">
                        <h3 className="text-xl">{profile.name}</h3>
                        <p>{profile.animal}</p>
                        <p>{profile.breed}</p>
                    </aside>
                </section>
                <section className="py-4">
                    <h3 className="text-xl my-2">Lives</h3>
                    <p>Owner:&nbsp;{profile.user}</p>
                    <p>Country:&nbsp;{profile.country}</p>
                    <p>Home:&nbsp;{profile.home}</p>
                </section>
                <section className="py-4">
                    <h3 className="text-xl my-2">About</h3>
                    <p>{profile.about}</p>
                </section>
            </article>
            <section>
                <h4>Posts</h4>
            </section>
        </>
    );
}