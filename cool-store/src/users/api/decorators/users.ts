import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiCreateUserResponse, ApiDeleteUserResponse, ApiFetchUserResponse, ApiFetchUsersResponse, ApiUpdateUserResponse } from '../responses/users';


export function ApiCreateUserDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new user' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'User created successfully.',
            type: ApiCreateUserResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input data.',
        }),
    );
}

export function ApiFindAllUsersDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all users' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of users fetched successfully.',
            type: ApiFetchUsersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters.',
        }),
    );
}

export function ApiFindOneUserDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve a specific user by ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the user. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '63e6f873a720e7c91c836f31',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Details of the requested user.',
            type: ApiFetchUserResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'User not found for the specified MongoDB ObjectId.',
        }),
    );
}

export function ApiUpdateUserDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Update a specific user by ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the user to update. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '63e6f873a720e7c91c836f31',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'User updated successfully.',
            type: ApiUpdateUserResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input or MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'User not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while updating the user.',
        }),
    );
}

export function ApiDeleteUserDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a specific user by ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the user to delete. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '63e6f873a720e7c91c836f31',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'User deleted successfully.',
            type: ApiDeleteUserResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'User not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while deleting the user.',
        }),
    );
}

export function ApiFindUsersByRoleDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve users by their role' }),
        ApiParam({
            name: 'role',
            description: 'The role of the users to retrieve. Must be one of the predefined roles.',
            schema: {
                type: 'string',
                enum: ['USER', 'ADMIN', 'MODERATOR'],
                example: 'ADMIN',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of users with the specified role.',
            type: ApiFetchUsersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid role parameter.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No users found for the specified role.',
        }),
    );
}

export function ApiSearchUsersDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Search for users based on a query' }),
        ApiQuery({
            name: 's',
            description: 'The search query to filter users by username, email, or other attributes.',
            schema: {
                type: 'string',
                example: 'john_doe',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of users matching the search query.',
            type: ApiFetchUsersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing query parameter.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No users found matching the search query.',
        }),
    );
}
