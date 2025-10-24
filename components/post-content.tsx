import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileService } from "@/lib/service/profiles";
import { loginUserState, writeTime } from "@/lib/utils";
import { PostsService } from "@/lib/service/posts";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import PostLikes from "./post-likes";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { Button } from "./ui/button";
import NotFound from "./not-found";
import MediaGallery from "./media-gallery";

export default async function PostContent({ postId }: { postId: number }) {

    const login = await currentUser();
    const userId = login ? await ProfileService().handleLoginUser(loginUserState(login)) : undefined;

    const post = await PostsService().getPost(postId, userId);
    if (!post) {
        return <NotFound />;
    }

    postId = post.id ?? -1;
    const profileName = post.profile?.name ?? "[Profile]";
    const userName = post.profile?.user;
    const avatarSrc = post.profile?.avatar?.source;
    const images = post.images ? post.images : undefined;
    const isLiked = post.isLiked ? (post.isLiked > 0) : false;

    return (
        <>
            <article className="border border-border rounded-md bg-card text-card-foreground">
                <h2 className="sr-only">Profile</h2>
                <Item>
                    <ItemHeader>
                        <ItemMedia>
                            <Avatar className="size-10">
                                <AvatarImage src={avatarSrc} alt={`Avatar for ${profileName}`} className="rounded-full" />
                                <AvatarFallback><Skeleton className="size-30 rounded-full" /></AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>
                                <Link href={`/profiles/${post.profile?.id ?? "#"}`} className="text-base hover:underline">
                                    {profileName}
                                </Link>
                            </ItemTitle>
                        </ItemContent>
                        <ItemContent className="flex-none text-right">
                            <ItemDescription>Poster: <span className="font-bold">{userName}</span></ItemDescription>
                            <ItemDescription>{writeTime(post.created)}</ItemDescription>
                        </ItemContent>
                    </ItemHeader>
                    <ItemContent>
                        <ItemTitle className="text-2xl sm:text-xl">{post.title}</ItemTitle>
                        <ItemDescription className="text-lg sm:text-base">{post.content}</ItemDescription>
                        <ItemMedia className="flex flex-row justify-center w-full">
                            {images ?
                                <Suspense>
                                    <MediaGallery images={images} />
                                </Suspense>
                                : ""}
                        </ItemMedia>
                    </ItemContent>
                    <ItemFooter>
                        <ItemActions>
                            <PostLikes postId={postId} likes={post.likes} isLiked={isLiked} />
                            <Link href={`/`}><Button className="py-6 sm:py-4"><MessageSquareText />&nbsp;0</Button></Link>
                        </ItemActions>
                    </ItemFooter>
                </Item>
            </article>
            <section className="p-2">
                <div className="flex flex-row justify-between my-2">
                    <h2 className="text-xl">Comments</h2>
                </div>
                <p className="p-4 text-base text-center">No posts have been made yet.</p>
            </section>
        </>
    );
}

export function PostContentSkeleton() {
    return (
        <div className="border border-border rounded-md">
            <h2 className="sr-only">Profile</h2>
            <Item>
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
            </Item>
        </div>
    );
}