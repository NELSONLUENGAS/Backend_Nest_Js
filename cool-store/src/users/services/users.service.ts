import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from 'src/config';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { IUser, UserRole } from 'src/users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UsersService {
    constructor(@Inject(config.KEY) private configService: ConfigType<typeof config>) { }
    private users: IUser[] = [
        { id: '1', username: 'john_doe', email: 'john.doe@example.com', password: 'password123', fullName: 'John Doe', role: UserRole.USER },
        { id: '2', username: 'jane_smith', email: 'jane.smith@example.com', password: 'password123', fullName: 'Jane Smith', role: UserRole.ADMIN },
        { id: '3', username: 'alice_jones', email: 'alice.jones@example.com', password: 'password123', fullName: 'Alice Jones', role: UserRole.USER },
        { id: '4', username: 'bob_martin', email: 'bob.martin@example.com', password: 'password123', fullName: 'Bob Martin', role: UserRole.USER },
        { id: '5', username: 'lily_white', email: 'lily.white@example.com', password: 'password123', fullName: 'Lily White', role: UserRole.ADMIN },
        { id: '6', username: 'james_brown', email: 'james.brown@example.com', password: 'password123', fullName: 'James Brown', role: UserRole.USER },
        { id: '7', username: 'emily_davis', email: 'emily.davis@example.com', password: 'password123', fullName: 'Emily Davis', role: UserRole.USER },
        { id: '8', username: 'michael_clark', email: 'michael.clark@example.com', password: 'password123', fullName: 'Michael Clark', role: UserRole.ADMIN },
        { id: '9', username: 'susan_evans', email: 'susan.evans@example.com', password: 'password123', fullName: 'Susan Evans', role: UserRole.USER },
        { id: '10', username: 'david_wilson', email: 'david.wilson@example.com', password: 'password123', fullName: 'David Wilson', role: UserRole.USER },
        { id: '11', username: 'carol_lee', email: 'carol.lee@example.com', password: 'password123', fullName: 'Carol Lee', role: UserRole.ADMIN },
        { id: '12', username: 'steven_moore', email: 'steven.moore@example.com', password: 'password123', fullName: 'Steven Moore', role: UserRole.USER },
        { id: '13', username: 'katherine_taylor', email: 'katherine.taylor@example.com', password: 'password123', fullName: 'Katherine Taylor', role: UserRole.USER },
        { id: '14', username: 'paul_johnson', email: 'paul.johnson@example.com', password: 'password123', fullName: 'Paul Johnson', role: UserRole.USER },
        { id: '15', username: 'anna_harris', email: 'anna.harris@example.com', password: 'password123', fullName: 'Anna Harris', role: UserRole.ADMIN },
        { id: '16', username: 'george_miller', email: 'george.miller@example.com', password: 'password123', fullName: 'George Miller', role: UserRole.USER },
        { id: '17', username: 'olivia_king', email: 'olivia.king@example.com', password: 'password123', fullName: 'Olivia King', role: UserRole.USER },
        { id: '18', username: 'henry_scott', email: 'henry.scott@example.com', password: 'password123', fullName: 'Henry Scott', role: UserRole.ADMIN },
        { id: '19', username: 'victoria_adams', email: 'victoria.adams@example.com', password: 'password123', fullName: 'Victoria Adams', role: UserRole.USER },
        { id: '20', username: 'daniel_rodgers', email: 'daniel.rodgers@example.com', password: 'password123', fullName: 'Daniel Rodgers', role: UserRole.USER }
    ];

    findAll(limit: number, page: number) {
        const apiKey = this.configService.apiKey
        console.log(apiKey)
        const offset = Math.abs(page - 1) * limit;
        const users = this.users.slice(offset, offset + limit);

        if (!users.length) {
            return {
                ok: false,
                data: [],
                msg: 'No users found'
            };
        } else {
            return {
                ok: true,
                msg: 'Users fetched successfully!',
                data: users
            };
        }
    }

    findOne(id: string) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            return {
                ok: false,
                data: {},
                msg: 'No user found'
            };
        } else {
            return {
                ok: true,
                data: user,
                msg: 'User fetched successfully!'
            };
        }
    }

    search(query: string) {
        const users = this.users.filter((user) =>
            Object.values(user).some((value) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );

        if (!users.length) {
            return {
                ok: false,
                data: [],
                msg: 'No users found'
            };
        } else {
            return {
                ok: true,
                msg: 'Users fetched successfully!',
                data: users
            };
        }
    }

    create(user: CreateUserDto) {
        const id: string = uuidv4();

        const newUser: IUser = {
            ...user,
            id
        };

        this.users.push(newUser);

        return {
            ok: true,
            data: newUser,
            msg: 'User created successfully!'
        };
    }

    update(id: string, userUpdated: UpdateUserDto) {
        const response = this.findOne(id);
        if (!response.ok) {
            return response;
        } else {
            this.users = this.users.map((user) =>
                user.id === id ? { ...user, ...userUpdated } : user
            );

            return {
                ...response,
                msg: 'User updated successfully!'
            };
        }
    }

    delete(id: string) {
        const response = this.findOne(id);
        if (!response.ok) {
            return response;
        } else {
            this.users = this.users.filter((user) => user.id !== id);

            return {
                ...response,
                msg: 'User deleted successfully!'
            };
        }
    }

    findByRole(role: UserRole) {
        const users = this.users.filter((user) => user.role === role);

        if (!users.length) {
            return {
                ok: false,
                data: [],
                msg: `No users found with role: ${role}`
            };
        } else {
            return {
                ok: true,
                msg: 'Users fetched successfully!',
                data: users
            };
        }
    }
}
