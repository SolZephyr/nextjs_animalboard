export interface Post {
    id: number;
    title: string;
    content: string;
    type: string;
    profile: {
        name: string;
        user: string;
    }
    created: string;
    updated: string;
}