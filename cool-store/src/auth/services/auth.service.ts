import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserModel } from '@users/interfaces/user.interface';
import { UsersService } from '@users/services/users.service';
import { compareSync } from 'bcrypt';
import { map, Observable } from 'rxjs';
import { IJwtTokenPayload } from '../interfaces/jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    verifyCredentials(email: string, password: string): Observable<Omit<IUserModel, 'password'> | null> {
        return this.userService.findByEmail(email).pipe(
            map((response) => {
                if ('data' in response && response.data) {
                    if (response.ok && !Array.isArray(response.data)) {
                        const match = compareSync(password, response.data.password);
                        const user = {
                            _id: response.data._id,
                            email: response.data.email,
                            username: response.data.username,
                            createdAt: response.data.createdAt,
                            updatedAt: response.data.updatedAt,
                            role: response.data.role,
                            fullName: response.data.fullName,
                        };

                        return match ? user : null;
                    }
                }
                return null;
            })
        );
    }

    genereateJwtToken(user$: Observable<IUserModel>) {
        return user$.pipe(
            map((user) => {
                const payload: Omit<IJwtTokenPayload, 'iat' | 'exp'> = {
                    sub: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                }
                return {
                    accessToken: this.jwtService.sign(payload)
                }
            })
        )
    }

}
