import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    validate(email: string, password: string) {
        return this.authService.verifyCredentials(email, password).pipe(
            map((user) => {
                if (!user) {
                    throw new UnauthorizedException('Invalid credentials');
                }
                return user;
            })
        )
    }
}
