import jsonPosts from "@/lib/data/posts.json";
import { ImportPost, Media, PostListParams, PostListResult } from "../types";
import { createImportPost, readPosts } from "@/db/posts";

export const PostsService = () => {

    const getPosts = (params: PostListParams): Promise<PostListResult> => {
        return readPosts(params);
    }

    // const getPost = (id: number): Promise<Post | null> => {
    //     return readPost(id)
    // }

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

    return { getPosts, populate };
}