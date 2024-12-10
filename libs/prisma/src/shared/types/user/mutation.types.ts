import { UpdateUserBase, UserBase } from "./base.types";


export type AddUserParams = UserBase;

export type UpdateUserParams = {
    id: number;
    data: Partial<UpdateUserBase>; // We have chosen Partial per https://www.typescriptlang.org/docs/handbook/utility-types.html as Partial constructs all types to be optional which is what we desire. **Caveat** NestJS will need to validate that there is some type of data that is being changed. With this implementation we scale with changes aka future proofing this solution but we need to ensure that something is being changes so that we don't waste resources withing the request/response cycle.
  };

export type RemoveUserByIdParams = {
    id: number;
};

export type SetUserPasswordParams = {
    id: number;
    password: string;
};

export type SetLastLoggedInParams = {
    id: number;
    lastLoggedIn: Date;
};