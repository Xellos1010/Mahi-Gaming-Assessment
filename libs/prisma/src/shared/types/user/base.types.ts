import { BookBase } from "../book/base.types";

export type UserBase = {
  id: number;
  name: string;
  email: string;
  password: string;
  lastLoggedIn: Date | null;
  favoriteBooks?: BookBase[];
};

export type UpdateUserBase = Omit<UserBase, 'id'>; // Exclude `id` for updates