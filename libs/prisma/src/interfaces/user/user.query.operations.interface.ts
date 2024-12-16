import { SingleUserResponseDto, BaseUserIdDto, BaseEmailDto, PrismaUserWithFavoriteBooksResponse, UsersListResponseDto } from "../../dtos";

export interface IUserQueryOperations {
  getAllUsers(): Promise<UsersListResponseDto>;
  getUserById(params: BaseUserIdDto): Promise<SingleUserResponseDto>;
  getUserByEmail(params: BaseEmailDto): Promise<SingleUserResponseDto>;
  getUserFavoriteBooks(params: BaseUserIdDto): Promise<PrismaUserWithFavoriteBooksResponse>;
  getUserByEmailIncludeFavoriteBooks(params: BaseEmailDto): Promise<PrismaUserWithFavoriteBooksResponse>;
}

//These have been removed as the response objects have been reduces to Single or BookList responses. I will leave these here in the future so that if requirements change and more specific responses are required then these can be uncommented and implemented.
// Response types for each operation 
// export interface PrismaGetAllUsersResponse {
//   users: User[];
// }

// export interface PrismaGetUserByIdResponse {
//   user: User;
// }

// export interface PrismaGetUserByEmailResponse {
//   user: User;
// }

// export interface PrismaGetUserFavoriteBooksResponse {
//   books: Book[];
// }

// export interface PrismaGetUserByEmailIncludeFavoriteBooksResponse {
//   user: PrismaUserResponseWithFavoriteBooks;
// }