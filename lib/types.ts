
export interface PostListParams {
    page: number;
    limit?: number | undefined;
    sort?: string | undefined;
    filter?: string | undefined;
    query?: string | undefined;
    tags?: PostTag[] | undefined;
    profileId?: number | undefined;
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
    query?: string | undefined;
    name?: string | undefined;
    userId?: number | undefined;
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

export interface Media {
    id?: number;
    type: string;
    source: string;
    created: Date;
    updated: Date | null;
    profile?: Profile;
    post?: Post;
}

export interface User {
    id: number;
    clerkId: string;
    email: string;
    firstname: string;
    lastname: string;
    created: Date;
    updated: Date | null;
}

export interface UserState {
    clerkId: string;
    email: string;
    firstname: string;
    lastname: string;
    created: Date;
    updated: Date | null;
}

export interface Profile {
    id?: number;
    name: string;
    nicknames: string;
    user: string;   // TODO: User
    avatarId?: number | null;
    avatar: Media | null;
    animal: string;
    breed: string;
    country: string;
    home: string;
    about: string;
    dateOfBirth: Date | null;
    created: Date;
    updated: Date | null;
    followers?: number;
    isFavourite?: number;
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
    id?: number;
    type: string;
    title: string;
    content: string;
    images?: Media[];
    profileId?: number | null;
    profile: Profile | null;
    imageIds?: number[] | null;
    created: Date;
    updated: Date | null;
}

export type DynamicParams = Promise<{ id?: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const LimitOptions = [10];

export interface PostTag {
    slug: string;
    label: string;
    color?: string;
}

export interface ImportPost extends Post {
    profileName: string;
}

export interface ResponseRest {
    status: number;
    body?: object;
    error?: string;
}