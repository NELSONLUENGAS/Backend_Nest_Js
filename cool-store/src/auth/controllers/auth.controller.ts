import { ROUTES } from '../../constants/routes';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { IUserModel } from '@users/interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Controller(ROUTES.AUTH.BASE)
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post(ROUTES.AUTH.LOGIN)
    @UseGuards(AuthGuard('local'))
    login(@Req() req: Request) {
        const user$ = req.user as Observable<IUserModel>;
        return this.authService.genereateJwtToken(user$)
    }
}
