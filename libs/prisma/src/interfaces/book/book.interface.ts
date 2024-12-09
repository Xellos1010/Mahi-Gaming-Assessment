export interface BookInterface {
    id: number;
    title: string;
    author: string;
    description?: string | null;
    imageId?: string | null;
}

export interface UpdateBookInterface {
    title?: string;
    author?: string;
    description?: string | null;
    imageId?: string | null;
}