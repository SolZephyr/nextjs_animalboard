export interface Post {
    id: number;
    type: string;
    title: string;
    content: string;
    images?: [string];
    profile: {
        name: string;
        user: string;
    }
    created: string;
    updated: string;
}