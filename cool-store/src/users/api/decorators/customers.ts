import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiCreateCustomerResponse, ApiDeleteCustomerResponse, ApiFetchCustomerResponse, ApiFetchCustomersResponse, ApiUpdateCustomerResponse } from '../responses/customer';




export function ApiCreateCustomerDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new customer' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Customer created successfully.',
            type: ApiCreateCustomerResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input data.',
        })
    );
}

export function ApiFindAllCustomersDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all customers' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of customers fetched successfully.',
            type: ApiFetchCustomersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters.',
        })
    );
}

export function ApiFindOneCustomerDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve a specific customer by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the customer to retrieve. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Details of the requested customer.',
            type: ApiFetchCustomerResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Customer not found for the specified MongoDB ObjectId.',
        })
    );
}

export function ApiUpdateCustomerDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Update a specific customer by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the customer to update. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The customer was successfully updated.',
            type: ApiUpdateCustomerResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input or MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Customer not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while updating the customer.',
        })
    );
}

export function ApiDeleteCustomerDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a specific customer by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the customer to delete. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The customer was successfully deleted.',
            type: ApiDeleteCustomerResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Customer not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while deleting the customer.',
        })
    );
}


export function ApiSearchCustomersDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Search for customers based on query parameters' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of customers matching the search query.',
            type: ApiFetchCustomersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No customers found matching the query.',
        })
    );
}
