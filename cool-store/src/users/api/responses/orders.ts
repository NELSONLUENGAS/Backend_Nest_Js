import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { OrderStatus } from "../../interfaces/order.interface";
import { OrderModel } from "../../models/order.model";


export class OrderItemModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the order item',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The product associated with the order item',
        example: 'Product 123',
    })
    product: string;

    @ApiProperty({
        description: 'The quantity of the product in the order',
        example: 2,
    })
    quantity: number;

    @ApiProperty({
        description: 'The price of a single unit of the product',
        example: 25.99,
    })
    price: number;
}

export class OrderModelResponse {
    @ApiProperty({
        description: 'The unique identifier of the order',
        example: '676f3972b3a21bda5a93dc9d',
    })
    _id: string;

    @ApiProperty({
        description: 'The customer associated with the order',
        example: 'Customer 123',
    })
    customerId: string;

    @ApiProperty({
        description: 'The shipping address for the order',
        example: '123 Main St, City, Country',
    })
    shippingAddress: string;

    @ApiProperty({
        description: 'The status of the order',
        enum: OrderStatus,
        example: 'Pending',
    })
    status: OrderStatus;

    @ApiProperty({
        description: 'The order items associated with the order',
        type: [OrderItemModelResponse],
    })
    orderItems: OrderItemModelResponse[];

    @ApiProperty({
        description: 'The total price of the order',
        example: 150.75,
    })
    totalPrice: number;

    @ApiProperty({
        description: 'The creation date of the order',
        example: '2025-01-01T12:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The last update date of the order',
        example: '2025-01-01T12:00:00Z',
    })
    updatedAt: Date;
}

@ApiExtraModels(OrderModelResponse)
class ApiOrderResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be an OrderModel or an array of OrderModel',
        oneOf: [
            { $ref: getSchemaPath(OrderModelResponse) }
        ],
    })
    readonly data: OrderModel;
}

@ApiExtraModels(OrderModelResponse)
class ApiOrdersResponse {
    @ApiProperty({
        description: 'Indicates whether the response was successful',
        example: true,
    })
    readonly ok: boolean;

    @ApiProperty({
        description: 'The data can be an array of OrderModel',
        type: 'array', items: { $ref: getSchemaPath(OrderModelResponse) }
    })
    readonly data: OrderModel[];
}

export class ApiCreateOrderResponse extends ApiOrderResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Order created successfully!',
    })
    readonly message: string;
}


export class ApiFetchOrdersResponse extends ApiOrdersResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Orders fetched successfully!',
    })
    readonly message: string;
}

export class ApiFetchOrderResponse extends ApiOrderResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Order fetched successfully!',
    })
    readonly message: string;
}

export class ApiUpdateOrderResponse extends ApiOrderResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Order updated successfully!',
    })
    readonly message: string;
}

export class ApiDeleteOrderResponse extends ApiOrderResponse {
    @ApiProperty({
        description: 'A message describing the result of the request',
        example: 'Order deleted successfully!',
    })
    readonly message: string;
}

export class ApiOrderTotalPriceResponse extends ApiOrderResponse {
    @ApiProperty({
        description: 'The total price of the order',
        example: 123.45,
    })
    readonly totalPrice: number;
}
