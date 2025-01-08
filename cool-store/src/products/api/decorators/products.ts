import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
    ApiCreateProductResponse,
    ApiDeleteProductResponse,
    ApiFetchProductResponse,
    ApiFetchProductsResponse,
    ApiUpdateProductResponse
} from '../responses/products';


export function ApiCreateProductDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new product' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Product created successfully.',
            type: ApiCreateProductResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input data.'
        })
    );
}

export function ApiFindAllProductsDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all products' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of products fetched successfully',
            type: ApiFetchProductsResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters'
        })
    );
}

export function ApiSearchProductsDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Search for products' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of products matching the search query',
            type: ApiFetchProductsResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters',
        })
    );
}

export function ApiProductsByCategoryDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve products by category' }),
        ApiParam({
            name: 'name',
            description: 'The name of the category to search for products',
            schema: {
                type: 'string',
                enum: ['Electronics', 'Audio', 'Wearables', 'Gaming', 'Accessories'],
                example: 'Electronics',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'A list of products belonging to the specified category',
            type: ApiFetchProductsResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing category',
        })
    );
}

export function ApiFindOneProductDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve a specific product by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the product to retrieve. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Details of the requested product',
            type: ApiFetchProductResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Product not found for the specified MongoDB ObjectId',
        }),
    );
}

export function ApiUpdateProductDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Update a specific product by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the product to update. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The product was successfully updated.',
            type: ApiUpdateProductResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input or MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Product not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while updating the product.',
        })
    );
}

export function ApiDeleteProductDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a specific product by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the product to delete. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The product was successfully deleted.',
            type: ApiDeleteProductResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Product not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while deleting the product.',
        })
    );
}
