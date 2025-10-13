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