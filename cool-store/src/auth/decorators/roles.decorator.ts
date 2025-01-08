import { applyDecorators, SetMetadata } from "@nestjs/common";
import { UserRole } from "@users/interfaces/user.interface";

export const ROLES_KEY = 'roles';

export function RolesAccess(...roles: UserRole[]) {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles)
    );
}
