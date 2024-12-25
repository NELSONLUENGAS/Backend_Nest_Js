export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    CUSTOMER = 'customer',
    MODERATOR = 'moderator',
    GUEST = 'guest',
    SUPPORT = 'support',
    USER = 'user',
}

export interface IUser {
    id: string
    username: string;
    email: string;
    password: string;
    fullName?: string;
    role?: UserRole;
}
