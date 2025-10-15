
export interface PostListParams {
    page: number;
    limit?: number | undefined;
    sort?: string | undefined;
    filter?: string | undefined;
    tags?: PostTag[] | undefined;
}

export interface PagingResult {
    page: number;
    limit: number;
    total: number;
}

export interface PostListResult {
    data?: {
        posts: Post[];
        meta: PagingResult;
    };
    error?: string;
}

export interface ProfileListParams {
    page: number;
    limit?: number | undefined;
    animal?: string | undefined;
    country?: string | undefined;
}

export interface ProfileListResult {
    data?: {
        profiles: Profile[];
        meta: PagingResult;
    };
    error?: string;
}

export enum Animal {
    NONE = "Unknown",
    Cat = "Cat",
    Dog = "Dog"
    // TODO: More
}

export enum Country {
    None = "Unknown"
}

export interface Profile {
    id: number;
    name: string;
    nicknames: string;
    user: string;   // TODO: User
    avatar: string; // TODO: Media
    animal: string;
    breed: string;
    country: string;
    home: string;
    about: string;
    dateOfBirth: Date | null;
    created: Date;
    updated: Date | null;
}

export interface ProfileState {
    name?: string;
    nicknames?: string;
    avatar?: string;
    animal?: string;
    breed?: string;
    country?: string;
    home?: string;
    about?: string;
    dateOfBirth?: Date;
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

export type DynamicParams = Promise<{ id?: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const LimitOptions = [10];

export interface PostTag {
    slug: string;
    label: string;
    color?: string;
}