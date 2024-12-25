import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsPhoneNumber()
    @IsOptional()
    readonly phone?: string;

    @IsString()
    @IsOptional()
    readonly address?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }
