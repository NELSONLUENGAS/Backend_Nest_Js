import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/users/interfaces/user.interface";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
