import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import { Post } from "@/lib/types";
import Image from "next/image";

export default function PostItem({ post }: { post: Post }) {
    return (
        <article className="flex w-full flex-col gap-6">
            <Item variant="outline">
                <ItemHeader>
                    <ItemMedia>
                        <Avatar className="size-10">
                            <AvatarImage src="https://github.com/evilrabbit.png" className="rounded-full" />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>{post.profile.name}</ItemTitle>
                    </ItemContent>
                    <ItemContent className="flex-none">
                        <ItemDescription>{post.profile.user}</ItemDescription>
                        <ItemDescription>{post.created}</ItemDescription>
                    </ItemContent>
                </ItemHeader>
                <ItemContent>
                    <ItemTitle>{post.title}</ItemTitle>
                    <ItemDescription>{post.content}</ItemDescription>
                    {post?.images ?
                        <ItemMedia>
                            <Image src={post.images[0]} width={150} height={150} alt="image" />
                        </ItemMedia> : ""
                    }
                </ItemContent>
                <ItemActions>
                </ItemActions>
            </Item>
        </article>
    )
}