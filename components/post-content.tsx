import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileService } from "@/lib/service/profiles";
import { loginUserState, writeTime } from "@/lib/utils";
import { PostsService } from "@/lib/service/posts";
import Gallery from "./media-gallery";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import PostLikes from "./post-likes";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { Button } from "./ui/button";
import NotFound from "./not-found";

export default async function PostContent({ postId }: { postId: number }) {

    const login = await currentUser();
    const userId = login ? await ProfileService().handleLoginUser(loginUserState(login)) : undefined;

    const post = await PostsService().getPost(postId, userId);
    if (!post) {
        return <NotFound />;
    }

    postId = post.id ?? -1;
    const profile = post.profile?.name ?? "[Profile]";
    const userName = post.profile?.user;
    const avatarSrc = post.profile?.avatar?.source;
    const images = post.images ? post.images : undefined;
    const isLiked = post.isLiked ? (post.isLiked > 0) : false;

    return (
        <>
            <article className="border border-border rounded-md">
                <h2 className="hidden">Profile</h2>
                <Item>
                    <ItemHeader>
                        <ItemMedia>
                            <Avatar className="size-10">
                                <AvatarImage src={avatarSrc} className="rounded-full" />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>
                                <Link href={`/profiles/${post.profile?.id ?? "#"}`} className="hover:underline">
                                    {profile}
                                </Link>
                            </ItemTitle>
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
                            <Link href={`/`}><Button><MessageSquareText />&nbsp;0</Button></Link>
                        </ItemActions>
                    </ItemFooter>
                </Item>
            </article>
            <section>
                <div className="flex flex-row justify-between my-2">
                    <h2 className="text-xl">Comments</h2>
                </div>
                <p>Something here.</p>
            </section>
        </>
    );
}

export function PostContentSkeleton() {
    return (
        <div className="border border-border rounded-md">
            <h2 className="hidden">Profile</h2>
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