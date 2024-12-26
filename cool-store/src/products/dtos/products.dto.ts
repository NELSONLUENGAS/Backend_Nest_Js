import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly price: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Category Name for the product' })
    readonly category: string;

    @IsString()
    @IsNotEmpty()
    readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }
