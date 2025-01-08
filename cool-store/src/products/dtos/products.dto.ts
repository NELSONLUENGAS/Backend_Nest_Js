import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product',
        example: 'Wireless Headphones',
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: 'Detailed description of the product',
        example: 'High-quality wireless headphones with noise cancellation.',
    })
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({
        description: 'Price of the product in USD',
        example: 199.99,
        minimum: 0.01,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({
        description: 'Available stock of the product',
        example: 50,
        minimum: 1,
    })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly stock: number;

    @ApiProperty({
        description: 'URL of the product image',
        example: 'https://example.com/images/product.jpg',
    })
    @IsUrl()
    @IsNotEmpty()
    readonly image: string;

    @ApiProperty({
        description: 'Category name to which the product belongs',
        example: 'Electronics',
    })
    @IsString()
    @IsNotEmpty()
    readonly category: string;

    @ApiProperty({
        description: 'Brand id of the product',
        example: 'Sony',
    })
    @IsNotEmpty()
    @IsMongoId()
    readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }

export class FilterProductDto {

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

export class SearchProductDto {
    @ApiProperty({
        description: 'Search term to filter products by name, category or description',
        example: 'Electronics',
        required: false,
        default: '',
    })
    @IsOptional()
    @IsString()
    s: string
}
