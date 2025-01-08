import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/config';
import { IJwtTokenPayload } from '../interfaces/jwt.interface';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {

    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtSecret
        });
    }

    validate(payload: IJwtTokenPayload) {
        return payload;
    }
}
