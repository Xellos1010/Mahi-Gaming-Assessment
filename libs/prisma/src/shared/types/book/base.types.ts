// libs/shared/types/src/types.ts

export type BookBase = {
    id: number;
    title: string;
    author: string;
    description?: string | null;
    imageId?: string | null;
  };
  
  export type UpdateBookBase = Omit<BookBase, 'id'>; // Exclude `id` for updates