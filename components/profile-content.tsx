import { PostListParams } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ProfileTag } from "./tags";
import PostsFeed from "./posts-feed";
import { CardType } from "./post-item";
import { ProfilePostsFilter } from "./posts-filter";
import { Skeleton } from "./ui/skeleton";
import ProfileImages from "./profile-images";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileService } from "@/lib/service/profiles";
import { loginUserState } from "@/lib/utils";
import ProfileFavs from "./profile-favs";
import NotFound from "./not-found";

export default async function ProfileContent({ profileId, postParams }: { profileId: number, postParams: PostListParams }) {

    const login = await currentUser();
    const userId = login ? await ProfileService().handleLoginUser(loginUserState(login)) : undefined;

    const profile = await ProfileService().getProfile(profileId, userId);
    if (!profile) {
        return <NotFound />;
    }

    profileId = profile.id ?? -1;

    if (postParams) {
        postParams.profileId = profileId;
    }
    const isFav = profile.isFavourite ? (profile.isFavourite > 0) : false;

    return (
        <>
            <article className="p-4 border border-border rounded-md">
                <h2 className="sr-only">Profile</h2>
                <div className="flex flex-row justify-between">
                    <section className="flex flex-row">
                        <Avatar className="size-30 border border-black">
                            <AvatarImage src={profile.avatar?.source} alt={`Avatar for ${profile.name}`} className="rounded-full" />
                            <AvatarFallback><Skeleton className="size-30 rounded-full" /></AvatarFallback>
                        </Avatar>
                        <aside className="flex flex-col ml-4">
                            <h3 className="text-2xl">{profile.name}</h3>
                            <p className="text-lg">{profile.animal}</p>
                            <p>{profile.breed}</p>
                            <p>Joined:&nbsp;{profile.created.toDateString()}</p>
                        </aside>
                    </section>
                    <aside>
                        <ProfileFavs profileId={profile.id ?? -1} favourites={profile.followers} isFavourite={isFav} />
                    </aside>
                </div>
                <section className="py-4">
                    <h3 className="my-2 text-2xl sm:text-xl">Lives</h3>
                    <p>Owner:&nbsp;<span>{profile.user}</span></p>
                    <p>Country:&nbsp;<span>{profile.country}</span></p>
                    <p>Home:&nbsp;<span>{profile.home}</span></p>
                </section>
                <section className="py-4">
                    <h3 className="my-2 text-2xl sm:text-xl">About</h3>
                    <p className="text-lg sm:text-base">{profile.about}</p>
                </section>
                {/* TODO: Tags */}
                <section className="py-4 hidden">
                    <h3 className="my-2 text-2xl sm:text-xl">Personality</h3>
                    <ul className="flex flex-row">
                        <li className="flex flex-row gap-1">
                            <ProfileTag label="Hello" />
                            <ProfileTag label="World" />
                        </li>
                    </ul>
                </section>
                <section>
                    <h3 className="my-2 text-2xl sm:text-xl">Images</h3>
                    <Suspense>
                        <ProfileImages profileId={profileId} />
                    </Suspense>
                </section>
            </article>
            <section className="p-2">
                <div className="flex flex-col sm:flex-row justify-between my-4">
                    <h2 className="my-1 text-2xl sm:text-xl">Posts</h2>
                    <Suspense>
                        <ProfilePostsFilter />
                    </Suspense>
                </div>
                <PostsFeed params={postParams} card={CardType.Profile} />
            </section>
        </>
    );
}

export function ProfileContentSkeleton() {
    return (
        <>
            <div className="p-4 border border-border rounded-md">
                <h2 className="sr-only">Profile</h2>
                <section className="flex flex-row">
                    <Skeleton className="size-30 rounded-full" />
                    <aside className="flex flex-col ml-4">
                        <Skeleton className="h-6 w-40 my-1" />
                        <Skeleton className="h-4 w-30 my-1" />
                        <Skeleton className="h-4 w-30 my-1" />
                        <Skeleton className="h-4 w-30 my-1" />
                    </aside>
                </section>
                <section className="py-4">
                    <Skeleton className="h-5 w-30 my-2 mb-4" />
                    <Skeleton className="h-4 w-30 my-1" />
                    <Skeleton className="h-4 w-30 my-1" />
                    <Skeleton className="h-4 w-30 my-1" />
                </section>
                <section className="py-4">
                    <Skeleton className="h-5 w-30 my-2 mb-4" />
                    <Skeleton className="h-4 w-full my-2" />
                    <Skeleton className="h-4 w-full my-2" />
                    <Skeleton className="h-4 w-full my-2" />
                </section>
            </div>
        </>
    );
}