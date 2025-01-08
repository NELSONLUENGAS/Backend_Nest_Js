import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";
import { UserRole } from "../interfaces/user.interface";
import { hashSync } from "bcrypt";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Transform(({ value }) => hashSync(value, 10))
    password: string;

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class FilterUserDto {

    @ApiProperty({
        description: 'The number to limit the query',
        example: 15,
        required: false,
        minimum: 1,
        default: 15,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => Number(value))
    limit: number;

    @ApiProperty({
        description: 'The number of page',
        example: 1,
        required: false,
        minimum: 1,
        default: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page: number;
}

export class SearchUsersDto {
    @ApiProperty({
        description: 'Search term to filter users by username, fullName or email',
        example: 'Pepito',
        required: false,
        default: '',
    })
    @IsOptional()
    @IsString()
    s: string
}
