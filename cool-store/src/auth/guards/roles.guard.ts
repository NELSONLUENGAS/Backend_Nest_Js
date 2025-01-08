import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IJwtTokenPayload } from '../interfaces/jwt.interface';
import { UserRole } from '@users/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
        if (!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user = req.user as IJwtTokenPayload;

        const hasPermission = roles.some((role) => user.role?.includes(role));

        if (!hasPermission) {
            throw new ForbiddenException('Forbidden: You do not have permission to access this resource.');
        }
        return hasPermission;
    }
}
