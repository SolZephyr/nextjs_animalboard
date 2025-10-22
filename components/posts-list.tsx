import { PostListParams } from "@/lib/types";
import PostItem, { CardType, PostItemLoading, ProfilePostItem, ProfilePostItemLoading } from "./post-item";
import { PaginationPaging } from "./pagination";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileService } from "@/lib/service/profiles";
import { loginUserState } from "@/lib/utils";
import { PostsService } from "@/lib/service/posts";
import { Suspense } from "react";

export default async function PostsList({ params, card }: { params: PostListParams, card?: CardType }) {

    const user = await currentUser();
    const loginId = user ? await ProfileService().handleLoginUser(loginUserState(user)) : undefined;

    params.userId = loginId;
    const result = await PostsService().getPosts(params);
    const paging = result.data?.meta;
    const posts = result.data?.posts ?? [];

    return (
        <>
            <ul className="grid grid-cols-1 auto-rows-min gap-4">
                {posts.map(post => (
                    <li key={post.id}>
                        {(card && card === CardType.Profile) ?
                            <ProfilePostItem post={post} />
                            :
                            <PostItem post={post} />
                        }
                    </li>
                ))}
            </ul>
            <Suspense>
                <PaginationPaging params={paging} />
            </Suspense>
        </>
    );
}

export function PostsListLoading({ card }: { card?: CardType }) {
    if (card && card === CardType.Profile) {
        return (
            <ul className="grid grid-cols-1 auto-rows-min gap-4">
                <ProfilePostItemLoading />
            </ul>
        );
    } else {
        return (
            <ul className="grid grid-cols-1 auto-rows-min gap-4">
                <PostItemLoading />
            </ul>
        );
    }
}