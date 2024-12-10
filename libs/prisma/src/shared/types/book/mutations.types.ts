import { BookBase, UpdateBookBase } from "./base.types";

export type AddBookParams = BookBase; // strict conformity
  
  export type RemoveBookByIdParams = {
    id: number;
  };
  
  export type UpdateBookParams = {
    id: number;
    data: Partial<UpdateBookBase>; // We have chosen Partial per https://www.typescriptlang.org/docs/handbook/utility-types.html as Partial constructs all types to be optional which is what we desire. **Caveat** NestJS will need to validate that there is some type of data that is being changed. With this implementation we scale with changes aka future proofing this solution but we need to ensure that something is being changes so that we don't waste resources withing the request/response cycle.
  };
  
  export type AddUserToFavoriteBookParams = {
    userId: number;
    bookId: number;
  };
  
  export type RemoveBookFromFavoritesParams = {
    userId: number;
    bookId: number;
  };