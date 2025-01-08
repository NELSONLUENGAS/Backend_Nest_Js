import { IApiServiceResponse } from "./common.interface";

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

export interface IUserModel {
    _id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: UserRole[];
    phone?: string;
    address?: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IApiUsersResponse extends IApiServiceResponse {
    data: IUserModel | IUserModel[]
}
