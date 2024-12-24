enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    CUSTOMER = 'customer',
    MODERATOR = 'moderator',
    GUEST = 'guest',
    SUPPORT = 'support',
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    fullName?: string;
    role?: UserRole;
}

export interface IUserUpdate {
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    role?: UserRole;
}
