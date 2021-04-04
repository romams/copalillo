export type Roles = 'EDITOR' | 'ADMIN' | '';
export interface User {

    username: string;
    password: string;
}
export interface UserResponse {
    userName: string;
    message: string;
    token: string;
    userId: number;
    role: Roles;
}