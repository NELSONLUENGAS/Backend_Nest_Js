import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Min } from "class-validator";

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

export class FilterCustomerDto {

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

export class SearchCustomerDto {
    @ApiProperty({
        description: 'Search term to filter products by name, category or description',
        example: 'Pepito',
        required: false,
        default: '',
    })
    @IsOptional()
    @IsString()
    s: string
}

