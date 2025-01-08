import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import {
    ApiCreateCategoryResponse,
    ApiDeleteCategoryResponse,
    ApiFetchCategoriesResponse,
    ApiFetchCategoryResponse,
    ApiUpdateCategoryResponse
} from "../responses/categories";



export function ApiCreateCategoryDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new category' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Category created successfully.',
            type: ApiCreateCategoryResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input data.'
        })
    );
}

export function ApiFindAllCategoriesDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all categories' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of categories fetched successfully',
            type: ApiFetchCategoriesResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters'
        })
    );
}

export function ApiFindOneCategoryDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve a specific category by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the category to retrieve. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Details of the requested category',
            type: ApiFetchCategoryResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Category not found for the specified MongoDB ObjectId',
        }),
    );
}

export function ApiUpdateCategoryDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Update a specific category by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the category to update. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The category was successfully updated.',
            type: ApiUpdateCategoryResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input or MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Category not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while updating the category.',
        })
    );
}

export function ApiDeleteCategoryDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a specific category by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the category to delete. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The category was successfully deleted.',
            type: ApiDeleteCategoryResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Category not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while deleting the category.',
        })
    );
}
