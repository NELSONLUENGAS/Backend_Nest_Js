import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../../interfaces/user.interface";

export class UserModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: '63e6f873a720e7c91c836f31',
    })
    _id: string;

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    username: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'The encrypted password of the user',
        example: '$2b$10$V1JHTX.g4lb...',
    })
    password: string;

    @ApiProperty({
        description: 'The full name of the user',
        example: 'John Doe',
    })
    fullName: string;

    @ApiProperty({
        description: 'The roles assigned to the user',
        example: ['USER', 'ADMIN'],
        isArray: true,
    })
    role: UserRole[];

    @ApiProperty({
        description: 'The phone number of the user (optional)',
        example: '+123456789',
        required: false,
    })
    phone?: string;

    @ApiProperty({
        description: 'The address of the user (optional)',
        example: '123 Main St, Springfield, USA',
        required: false,
    })
    address?: string;

    @ApiProperty({
        description: 'The profile picture URL of the user (optional)',
        example: 'https://example.com/images/profile.jpg',
        required: false,
    })
    profilePicture?: string;
}

@ApiExtraModels(UserModelResponse)
export class ApiFetchUsersResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Users fetched successfully!',
    })
    readonly message: string;

    @ApiProperty({
        description: 'An array of user objects',
        type: [UserModelResponse],
    })
    readonly data: UserModelResponse[];
}

@ApiExtraModels(UserModelResponse)
export class ApiFetchUserResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'User fetched successfully!',
    })
    readonly message: string;

    @ApiProperty({
        description: 'The user object',
        type: UserModelResponse,
    })
    readonly data: UserModelResponse;
}

@ApiExtraModels(UserModelResponse)
export class ApiCreateUserResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'User created successfully!',
    })
    readonly message: string;

    @ApiProperty({
        description: 'The newly created user object',
        type: UserModelResponse,
    })
    readonly data: UserModelResponse;
}

@ApiExtraModels(UserModelResponse)
export class ApiUpdateUserResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'User updated successfully!',
    })
    readonly message: string;

    @ApiProperty({
        description: 'The updated user object',
        type: UserModelResponse,
    })
    readonly data: UserModelResponse;
}

@ApiExtraModels(UserModelResponse)
export class ApiDeleteUserResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'User deleted successfully!',
    })
    readonly message: string;

    @ApiProperty({
        description: 'The deleted user object',
        type: UserModelResponse,
    })
    readonly data: UserModelResponse;
}
