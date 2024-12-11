import { PrismaDto, PickFields } from './prisma-dto.utility';
import { Prisma } from '@prisma/client';

// DTO for User creation
export type UserCreateDto = PrismaDto<Prisma.UserCreateInput>;

// DTO for User update
export type UserUpdateDto = PrismaDto<Prisma.UserUpdateInput>;

// Specific fields for partial updates
export type UpdateUserPasswordDto = PickFields<Prisma.UserUpdateInput, 'password'>;
export type UpdateUserLastLoggedInDto = PickFields<Prisma.UserUpdateInput, 'lastLoggedIn'>;