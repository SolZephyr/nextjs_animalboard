import { Profile } from "@/lib/types";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import ProfileFavs from "./profile-favs";

export default function ProfileItem({ profile }: { profile: Profile }) {
    const isFav = profile.isFavourite ? (profile.isFavourite > 0) : false;
    return (
        <Link href={`/profiles/${profile.id}`}>
            <article>
                <Item variant="outline" className="p-4 hover:bg-gray-50">
                    <ItemHeader>
                        <ItemMedia>
                            <Avatar className="size-10">
                                <AvatarImage src={profile.avatar?.source} className="rounded-full" />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>{profile.name}</ItemTitle>
                            <ItemDescription>{profile.animal}</ItemDescription>
                        </ItemContent>
                        <ItemContent className="flex flex-col mb-0">
                            <ProfileFavs profileId={profile.id ?? -1} favourites={profile.followers} isFavourite={isFav} />
                        </ItemContent>
                    </ItemHeader>
                </Item>
            </article>
        </Link>
    );
}

export function ProfileItemSkeleton() {
    return (
        <div>
            <Item variant="outline" className="p-4">
                <ItemHeader>
                    <ItemMedia>
                        <Skeleton className="size-10 rounded-full" />
                    </ItemMedia>
                    <ItemContent>
                        <Skeleton className="h-5 w-30" />
                        <Skeleton className="h-4 w-30" />
                    </ItemContent>
                </ItemHeader>
            </Item>
        </div>
    );
}