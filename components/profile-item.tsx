import { Profile } from "@/lib/types";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function ProfileItem({ profile }: { profile: Profile }) {
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
                    </ItemHeader>
                </Item>
            </article>
        </Link>
    );
}