import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { OrderModel } from "../../models/order.model";
import { OrderModelResponse } from "./orders";


class CustomerModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the customer',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The first name of the customer',
        example: 'John',
    })
    firstName: string;

    @ApiProperty({
        description: 'The last name of the customer',
        example: 'Doe',
    })
    lastName: string;

    @ApiProperty({
        description: 'The email of the customer',
        example: 'johndoe@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'The phone number of the customer',
        example: '+123456789',
    })
    phone: string;

    @ApiProperty({
        description: 'The address of the customer',
        example: '123 Main St, City, Country',
    })
    address: string;

    @ApiProperty({
        description: 'The city where the customer resides',
        example: 'New York',
        required: false,
    })
    city?: string;

    @ApiProperty({
        description: 'The country where the customer resides',
        example: 'USA',
        required: false,
    })
    country?: string;

    @ApiProperty({
        description: 'The zip code of the customer\'s address',
        example: '10001',
        required: false,
    })
    zipCode?: string;

    @ApiProperty({
        description: 'The registration date of the customer',
        example: '2022-01-01T00:00:00Z',
        required: false,
    })
    registrationDate?: Date;

    @ApiProperty({
        description: 'Indicates whether the customer is active',
        example: true,
        required: false,
    })
    isActive?: boolean;

    @ApiProperty({
        description: 'The orders associated with the customer',
        type: 'array',
        items: { $ref: getSchemaPath(OrderModelResponse) },
    })
    orders: OrderModel[];

}

@ApiExtraModels(CustomerModelResponse)
class ApiCustomerResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a CustomerModel or an array of CustomerModel',
        oneOf: [
            { $ref: getSchemaPath(CustomerModelResponse) }
        ],
    })
    readonly data: CustomerModelResponse;
}

@ApiExtraModels(CustomerModelResponse)
class ApiCustomersResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be a CustomerModel or an array of CustomerModel',
        type: 'array', items: { $ref: getSchemaPath(CustomerModelResponse) }
    })
    readonly data: CustomerModelResponse[];
}

export class ApiCreateCustomerResponse extends ApiCustomerResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Customer created successfully!',
    })
    readonly message: string;
}

export class ApiFetchCustomersResponse extends ApiCustomersResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Customers fetched successfully!',
    })
    readonly message: string;
}

export class ApiFetchCustomerResponse extends ApiCustomerResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Customer fetched successfully!',
    })
    readonly message: string;
}

export class ApiUpdateCustomerResponse extends ApiCustomerResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Customer updated successfully!',
    })
    readonly message: string;
}

export class ApiDeleteCustomerResponse extends ApiCustomerResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Customer deleted successfully!',
    })
    readonly message: string;
}
