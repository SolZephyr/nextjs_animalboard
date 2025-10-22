import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import { Post } from "@/lib/types";
import { Button } from "./ui/button";
import { Heart, MessageSquareText } from "lucide-react";
import { writeTime } from "@/lib/utils";
import { Suspense } from "react";
import Gallery from "./media-gallery";
import { Skeleton } from "./ui/skeleton";
import PostLikes from "./post-likes";
import Link from "next/link";

export enum CardType {
    Feed,
    Profile
}

export default function PostItem({ post }: { post: Post }) {
    const postId = post.id ?? 0;
    const profileName = post.profile?.name ?? "[Profile]";
    const userName = post.profile?.user ?? "[User]";
    const avatarSrc = post.profile?.avatar?.source ?? "";
    const images = post.images ? post.images : undefined;
    const isLiked = post.isLiked ? (post.isLiked > 0) : false;
    return (
        <Link href={`/posts/${post.id}`}>
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
                            <ItemDescription>Poster: <span className="font-bold">{userName}</span></ItemDescription>
                            <ItemDescription>{writeTime(post.created)}</ItemDescription>
                        </ItemContent>
                    </ItemHeader>
                    <ItemContent>
                        <ItemTitle className="text-xl">{post.title}</ItemTitle>
                        <ItemDescription>{post.content}</ItemDescription>
                        <ItemMedia className="flex flex-row justify-center w-full">
                            {images ?
                                <Suspense>
                                    <Gallery images={images} />
                                </Suspense>
                                : ""}
                        </ItemMedia>
                    </ItemContent>
                    <ItemFooter>
                        <ItemActions>
                            <PostLikes postId={postId} likes={post.likes} isLiked={isLiked} />
                            <Button><MessageSquareText />&nbsp;0</Button>
                        </ItemActions>
                    </ItemFooter>
                </Item>
            </article>
        </Link>
    )
}

export function PostItemLoading() {
    return (
        <div className="flex w-full flex-col gap-6">
            <Item variant="outline" className="p-4">
                <ItemHeader>
                    <ItemMedia>
                        <Skeleton className="size-10 rounded-full" />
                    </ItemMedia>
                    <ItemContent>
                        <Skeleton className="h-5 w-30" />
                    </ItemContent>
                    <ItemContent className="flex-none text-right">
                        <Skeleton className="h-4 w-30" />
                        <Skeleton className="h-4 w-30" />
                    </ItemContent>
                </ItemHeader>
                <ItemContent>
                    <Skeleton className="text-xl w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-30 w-full" />
                </ItemContent>
                <ItemFooter>
                    <ItemActions>
                        <Skeleton className="h-8 w-18" />
                        <Skeleton className="h-8 w-18" />
                    </ItemActions>
                </ItemFooter>
            </Item>
        </div>
    )
}

export function ProfilePostItem({ post }: { post: Post }) {
    const postId = post.id ?? 0;
    const userName = post.profile?.user ?? "[User]";
    const images = post.images ? post.images : undefined;
    const isLiked = post.isLiked ? (post.isLiked > 0) : false;
    return (
        <Link href={`/posts/${post.id}`}>
            <article className="flex w-full flex-col gap-6">
                <Item variant="outline" className="p-4">
                    <ItemContent>
                        <ItemTitle className="text-xl">{post.title}</ItemTitle>
                        <ItemDescription>{post.content}</ItemDescription>
                        <ItemMedia className="flex flex-row justify-center w-full">
                            {images ?
                                <Suspense>
                                    <Gallery images={images} />
                                </Suspense>
                                : ""}
                        </ItemMedia>
                    </ItemContent>
                    <ItemFooter>
                        <ItemActions>
                            <PostLikes postId={postId} likes={post.likes} isLiked={isLiked} />
                            <Button><MessageSquareText />&nbsp;0</Button>
                        </ItemActions>
                        <ItemContent className="flex-none text-right">
                            <ItemDescription>Poster: <span className="font-bold">{userName}</span></ItemDescription>
                            <ItemDescription>{writeTime(post.created)}</ItemDescription>
                        </ItemContent>
                    </ItemFooter>
                </Item>
            </article>
        </Link>
    )
}

export function ProfilePostItemLoading() {
    return (
        <div className="flex w-full flex-col gap-6">
            <Item variant="outline" className="p-4">
                <ItemContent>
                    <Skeleton className="text-xl w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-30 w-full" />
                </ItemContent>
                <ItemFooter>
                    <ItemActions>
                        <Skeleton>
                            <Button><Heart />&nbsp;0</Button>
                        </Skeleton>
                        <Skeleton>
                            <Button><MessageSquareText />&nbsp;0</Button>
                        </Skeleton>
                    </ItemActions>
                    <ItemContent className="flex-none text-right">
                        <Skeleton className="h-8 w-18" />
                        <Skeleton className="h-8 w-18" />
                    </ItemContent>
                </ItemFooter>
            </Item>
        </div>
    )
}