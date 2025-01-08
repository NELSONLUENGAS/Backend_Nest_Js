import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { CategoryModel } from "../../models/category.model.ts";


class CategoryModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the category',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The name of the category',
        example: 'Accessories',
    })
    name: string;

    @ApiProperty({
        description: 'The internal version of the category',
        example: 0,
    })
    __v: number;
}

@ApiExtraModels(CategoryModelResponse)
class ApiCategoryResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a CategoryModel or an array of CategoryModel',
        oneOf: [
            { $ref: getSchemaPath(CategoryModelResponse) }
        ],
    })
    readonly data: CategoryModel;
}

@ApiExtraModels(CategoryModelResponse)
class ApiCategorysResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a CategoryModel or an array of CategoryModel',
        type: 'array', items: { $ref: getSchemaPath(CategoryModelResponse) }

    })
    readonly data: CategoryModel[];
}

export class ApiCreateCategoryResponse extends ApiCategoryResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Category created successfully!',
    })
    readonly message: string;
}


export class ApiFetchCategoriesResponse extends ApiCategorysResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Categories fetched successfully!',
    })
    readonly message: string;
}

export class ApiFetchCategoryResponse extends ApiCategoryResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Category fetched successfully!',
    })
    readonly message: string;
}

export class ApiUpdateCategoryResponse extends ApiCategoryResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Category updated successfully!',
    })
    readonly message: string;
}

export class ApiDeleteCategoryResponse extends ApiCategoryResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Category deleted successfully!',
    })
    readonly message: string;
}
