import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
    ApiCreateBrandResponse,
    ApiDeleteBrandResponse,
    ApiFetchBrandResponse,
    ApiFetchBrandsResponse,
    ApiUpdateBrandResponse
} from '../responses/brands';


export function ApiCreateBrandDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new brand' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Brand created successfully.',
            type: ApiCreateBrandResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input data.'
        })
    );
}

export function ApiFindAllBrandsDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all brands' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of brands fetched successfully',
            type: ApiFetchBrandsResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters'
        })
    );
}

export function ApiFindOneBrandDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve a specific brand by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the brand to retrieve. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Details of the requested brand',
            type: ApiFetchBrandResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Brand not found for the specified MongoDB ObjectId',
        }),
    );
}

export function ApiUpdateBrandDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Update a specific brand by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the brand to update. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The brand was successfully updated.',
            type: ApiUpdateBrandResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input or MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Brand not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while updating the brand.',
        })
    );
}

export function ApiDeleteBrandDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a specific brand by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the brand to delete. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The brand was successfully deleted.',
            type: ApiDeleteBrandResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Brand not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while deleting the brand.',
        })
    );
}
