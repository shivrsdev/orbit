// /src/models/post.tsx
// Post interface

export interface Post {
    readonly id: number;
    readonly author: string;
    readonly authorId: number;
    readonly title: string;
    readonly content: string;
    // likesCount and liked are changed based on if the like button is clicked or not
    likesCount: number;
    liked: boolean | undefined;
}