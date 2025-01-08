import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { IApiUsersResponse, IUserModel, UserRole } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { IApiServiceError } from '../interfaces/common.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<IUserModel>
    ) { }

    findAll(limit: number, page: number) {
        const offset = Math.abs(page - 1) * limit
        return from(
            this.userModel
                .find()
                .skip(offset)
                .limit(limit)
                .exec()
        ).pipe(
            map((users): IApiUsersResponse => {
                if (!users.length) {
                    throw new NotFoundException('Users not found')
                } else {
                    return {
                        ok: true,
                        message: 'Users fetched successfully!',
                        data: users,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        );
    }

    findByRole(role: UserRole) {
        return from(
            this.userModel
                .find()
                .where({
                    role: role
                })
                .exec()
        ).pipe(
            map((users): IApiUsersResponse => {
                if (!users.length) {
                    throw new NotFoundException('Users not found')
                } else {
                    return {
                        ok: true,
                        message: 'Users fetched successfully!',
                        data: users,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        )
    }

    findByEmail(email: string): Observable<IApiUsersResponse | IApiServiceError> {
        return from(
            this.userModel
                .findOne()
                .where({
                    email: email
                })
        ).pipe(
            map((user) => {
                if (!user) {
                    throw new NotFoundException('User not found')
                } else {
                    return {
                        ok: true,
                        message: 'User fetched successfully!',
                        data: user,
                    };
                }
            }),
            catchError((error) => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        )
    }

    findOne(id: string) {
        return from(
            this.userModel
                .findById(id)
                .exec()
        ).pipe(
            map((user): IApiUsersResponse => {
                if (!user) {
                    throw new NotFoundException('User not found')
                } else {
                    return {
                        ok: true,
                        message: 'User fetched successfully!',
                        data: user,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        )
    }

    search(query: string) {
        return of(query).pipe(
            switchMap((queryTerm) => {
                return from(
                    this.userModel
                        .find({
                            $or: [
                                { username: { $regex: queryTerm, $options: 'i' } },
                                { email: { $regex: queryTerm, $options: 'i' } },
                                { fullName: { $regex: queryTerm, $options: 'i' } },
                            ],
                        }).exec()
                ).pipe(
                    map((users): IApiUsersResponse => {
                        if (!users.length) {
                            throw new NotFoundException('Users not found')
                        } else {
                            return {
                                ok: true,
                                message: 'Users fetched successfully!',
                                data: users,
                            };
                        }
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error
                        })
                    })
                );
            })
        );
    }

    create(user: CreateUserDto) {
        return from(this.userModel.create(user)).pipe(
            map((savedUser): IApiUsersResponse => (
                {
                    ok: true,
                    message: 'User created successfully!',
                    data: savedUser
                }
            )
            ),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        );
    }

    update(id: string, payload: UpdateUserDto) {
        return this.findOne(id)
            .pipe(
                switchMap((response) => {
                    if (!response.ok) {
                        return of(response)
                    }
                    return from(
                        this.userModel.findOneAndUpdate({ _id: id }, payload, { new: true })
                    ).pipe(
                        map((userToUpdate): IApiUsersResponse => {
                            if (!userToUpdate) {
                                throw new BadRequestException('The user could not be updated.')
                            } else {
                                return {
                                    ok: true,
                                    message: 'User updated successfully!',
                                    data: userToUpdate,
                                };
                            }
                        }),
                        catchError((error): Observable<IApiServiceError> => {
                            return of({
                                ok: false,
                                ...error.response ?? error
                            })
                        })
                    );
                })
            )
    }

    delete(id: string) {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response)
                }

                return from(this.userModel.findOneAndDelete({ _id: id })).pipe(
                    map((userDeleted): IApiUsersResponse => {
                        if (!userDeleted) {
                            throw new BadRequestException('The user could not be deleted.')
                        } else {
                            return {
                                ok: true,
                                message: 'User deleted successfully!',
                                data: userDeleted,
                            };
                        }
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error
                        })
                    })
                );
            })
        );
    }
}
