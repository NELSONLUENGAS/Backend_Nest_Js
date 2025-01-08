import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategyService } from './strategies/local.strategy.service';
import { UsersModule } from '@users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategyService } from './strategies/jwt.strategy.service';


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => ({
                secret: configService.jwtSecret,
                signOptions: { expiresIn: '1d' }
            })
        })
    ],
    providers: [AuthService, LocalStrategyService, JwtStrategyService],
    controllers: [AuthController]
})
export class AuthModule { }
