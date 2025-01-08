import { ApiExtraModels, ApiProperty, getSchemaPath, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CategoryModel } from "../models/category.model.ts";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Name of the category',
        example: 'Electronics',
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }


export class CategoryModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the brand',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The name of the brand',
        example: 'Electric Scooter',
    })
    name: string;

    @ApiProperty({
        description: 'The internal version of the brand',
        example: 0,
    })
    __v: number;
}

@ApiExtraModels(CategoryModelResponse)
export class CategoryResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Category deleted successfully!',
    })
    readonly message: string;

    @ApiProperty({
        description: 'The data can be a CategoryModel or an array of CategoryModel',
        oneOf: [
            { type: 'array', items: { $ref: getSchemaPath(CategoryModelResponse) } },
            { $ref: getSchemaPath(CategoryModelResponse) }
        ],
    })
    readonly data: CategoryModel | CategoryModel[];
}
