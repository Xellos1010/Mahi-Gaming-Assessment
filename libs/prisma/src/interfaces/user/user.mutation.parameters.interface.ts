export interface AddUserParams {
    name: string;
    email: string;
    password: string;
}

export interface RemoveUserByIdParams {
    id: number;
}

export interface SetUserPasswordParams {
    id: number;
    password: string;
}

export interface SetLastLoggedInParams {
    id: number;
    lastLoggedIn: Date;
}