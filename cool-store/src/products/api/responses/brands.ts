import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { BrandModel } from "../../models/brand.model";

class BrandModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the brand',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The name of the brand',
        example: 'TechCorp',
    })
    name: string;

    @ApiProperty({
        description: 'The internal version of the brand',
        example: 0,
    })
    __v: number;
}

@ApiExtraModels(BrandModelResponse)
class ApiBrandResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a ProductModel or an array of ProductModel',
        oneOf: [
            { $ref: getSchemaPath(BrandModelResponse) }
        ],
    })
    readonly data: BrandModel;
}

@ApiExtraModels(BrandModelResponse)
class ApiBrandsResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a BrandModel or an array of BrandModel',
        type: 'array', items: { $ref: getSchemaPath(BrandModelResponse) }

    })
    readonly data: BrandModel[];
}

export class ApiCreateBrandResponse extends ApiBrandResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Brand created successfully!',
    })
    readonly message: string;
}


export class ApiFetchBrandsResponse extends ApiBrandsResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Brands fetched successfully!',
    })
    readonly message: string;
}

export class ApiFetchBrandResponse extends ApiBrandResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Brand fetched successfully!',
    })
    readonly message: string;
}

export class ApiUpdateBrandResponse extends ApiBrandResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Brand updated successfully!',
    })
    readonly message: string;
}

export class ApiDeleteBrandResponse extends ApiBrandResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Brand deleted successfully!',
    })
    readonly message: string;
}
