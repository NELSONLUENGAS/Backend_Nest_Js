import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }

        const canActivateResult = super.canActivate(context);

        return from(Promise.resolve(canActivateResult)).pipe(
            switchMap((result) => {
                if (typeof result === 'boolean') {
                    return of(result);
                }
            }),
            map((result) => result),
            catchError(() => {
                throw new UnauthorizedException('Token inválido o faltante');
            }),
        );
    }
}
