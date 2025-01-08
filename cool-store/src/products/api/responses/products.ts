import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ProductModel } from "../../models/product.model";

class ProductModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the product',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The name of the product',
        example: 'Electric Scooter',
    })
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'Eco-friendly electric scooter with a 25-mile range.',
    })
    description: string;

    @ApiProperty({
        description: 'The image URL of the product',
        example: 'https://example.com/products/electric_scooter.jpg',
    })
    image: string;

    @ApiProperty({
        description: 'The price of the product',
        example: 499.99,
    })
    price: number;

    @ApiProperty({
        description: 'The stock quantity of the product',
        example: 15,
    })
    stock: number;

    @ApiProperty({
        description: 'The category of the product',
        example: 'Transportation',
    })
    category: string;

    @ApiProperty({
        description: 'The brand of the product',
        example: 'EcoRide',
    })
    brand: string;
}

@ApiExtraModels(ProductModelResponse)
class ApiProductResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a ProductModel or an array of ProductModel',
        oneOf: [
            { $ref: getSchemaPath(ProductModelResponse) }
        ],
    })
    readonly data: ProductModel;
}

@ApiExtraModels(ProductModelResponse)
class ApiProductsResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a ProductModel or an array of ProductModel',
        type: 'array', items: { $ref: getSchemaPath(ProductModelResponse) }

    })
    readonly data: ProductModel[];
}

export class ApiCreateProductResponse extends ApiProductResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Product created successfully!',
    })
    readonly message: string;
}


export class ApiFetchProductsResponse extends ApiProductsResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Products fetched successfully!',
    })
    readonly message: string;
}

export class ApiFetchProductResponse extends ApiProductResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Product fetched successfully!',
    })
    readonly message: string;
}

export class ApiUpdateProductResponse extends ApiProductResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Product updated successfully!',
    })
    readonly message: string;
}

export class ApiDeleteProductResponse extends ApiProductResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Product deleted successfully!',
    })
    readonly message: string;
}
