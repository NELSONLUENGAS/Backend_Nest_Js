import { UserRole } from "@users/interfaces/user.interface";

export interface IJwtTokenPayload {
    sub: string;
    email: string;
    username: string;
    role: UserRole[];
    iat: number;
    exp: number;
}
