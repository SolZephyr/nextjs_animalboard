import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import { Post } from "@/lib/types";
import { Button } from "./ui/button";
import { Heart, MessageSquareText } from "lucide-react";
import { writeTime } from "@/lib/utils";
import MediaGallery from "./media-gallery";
import { Suspense } from "react";

export default function PostItem({ post }: { post: Post }) {
    const profileName = post.profile?.name ?? "[Profile]";
    const userName = post.profile?.user ?? "[User]";
    const avatarSrc = post.profile?.avatar?.source ?? "";
    const images = post.images ? post.images : undefined;
    return (
        <article className="flex w-full flex-col gap-6">
            <Item variant="outline" className="p-4">
                <ItemHeader>
                    <ItemMedia>
                        <Avatar className="size-10">
                            <AvatarImage src={avatarSrc} className="rounded-full" />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>{profileName}</ItemTitle>
                    </ItemContent>
                    <ItemContent className="flex-none text-right">
                        <ItemDescription>Poster: {userName}</ItemDescription>
                        <ItemDescription>{writeTime(post.created)}</ItemDescription>
                    </ItemContent>
                </ItemHeader>
                <ItemContent>
                    <ItemTitle className="text-xl">{post.title}</ItemTitle>
                    <ItemDescription>{post.content}</ItemDescription>
                    <ItemMedia className="flex flex-row justify-center w-full">
                        <Suspense>
                            <MediaGallery images={images} />
                        </Suspense>
                    </ItemMedia>
                </ItemContent>
                <ItemFooter>
                    <ItemActions>
                        <Button><Heart />&nbsp;0</Button>
                        <Button><MessageSquareText />&nbsp;0</Button>
                    </ItemActions>
                </ItemFooter>
            </Item>
        </article>
    )
}