import { Prisma } from "@prisma/client";
import { PrismaDto } from "./prisma-dto.utility";

export class UserDto implements PrismaDto<Prisma.UserCreateInput> {
    name: string;
    email: string;
    password: string;
    lastLoggedIn?: Date | null;
}

//This is to be worked on as we need to research and evaluate if UncheckCreateInput will satisfy all use-cases
export class UserFavoritesDto implements PrismaDto<Prisma.UserFavoritesUncheckedCreateInput> {
    userId: number;
    bookId: number;
}