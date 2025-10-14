
export interface PostListParams {
    page: number;
    limit?: number | undefined;
    sort?: string | undefined;
    filter?: string | undefined;
    tags?: PostTag[] | undefined;
}

export interface PostListResult {
    posts: Post[];
    page: number;
    limit: number;
    total: number;
}

export interface Post {
    id: number;
    type: string;
    title: string;
    content: string;
    images?: string[];
    profile: {
        name: string;
        avatar: string;
        user: string;
    }
    created: string;
    updated: string;
}

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const LimitOptions = [10];

export interface PostTag {
    slug: string;
    label: string;
    color?: string;
}