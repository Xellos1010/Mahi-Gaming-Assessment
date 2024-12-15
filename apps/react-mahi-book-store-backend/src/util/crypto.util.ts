import * as bcrypt from 'bcrypt';

export async function hashPassword(password:string) {
    return await bcrypt.hash(password, 10);
}

export async function comparePasswords(passwordAttempt: string, passwordStored: string){
    return await bcrypt.compare(passwordAttempt, passwordStored);
}