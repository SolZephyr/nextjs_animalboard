import jsonPosts from "@/lib/data/posts.json";
import { ImportPost, Media, Post, PostListParams, PostListResult } from "../types";
import { createImportPost, createPostLike, deletePostLike, readPost, readPostLikes, readPosts } from "@/db/posts";

export const PostsService = () => {

    const getPosts = (params: PostListParams): Promise<PostListResult> => {
        return readPosts(params);
    }

    const getPost = (id: number, userId?: number): Promise<Post | null> => {
        return readPost(id, userId);
    }

    const addLike = async (postId: number, userId: number): Promise<{ current: boolean; count: number; }> => {
        const select = await readPostLikes(postId, userId);
        let current = (select.length > 0);
        if (current) {
            const removed = await deletePostLike(postId, userId);
            current = (removed == 0);
        } else {
            const added = await createPostLike(postId, userId);
            current = (added > 0);
        }
        const count = await readPostLikes(postId);
        return {
            current: current,
            count: count.length
        }
    }

    const populate = () => {
        const data = jsonPosts ?? [];

        const posts: ImportPost[] = data.map(item => {
            const images: Media[] = [];
            if (item.imageUrls) {
                for (const image of item.imageUrls) {
                    const media: Media = {
                        type: "IMAGE",
                        source: image,
                        created: new Date(item.created),
                        updated: null
                    }
                    images.push(media);
                }
            }
            const post: ImportPost = {
                type: item.type,
                title: item.title,
                content: item.content,
                profile: null,
                created: new Date(item.created),
                updated: null,
                images: images.length ? images : undefined,
                profileName: item.profile
            }
            return post;
        });
        posts.map(post => {
            createImportPost(post);
        });
    }

    return { getPosts, getPost, addLike, populate };
}