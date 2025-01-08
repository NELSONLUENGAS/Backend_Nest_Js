import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ApiCreateOrderResponse, ApiDeleteOrderResponse, ApiFetchOrderResponse, ApiFetchOrdersResponse, ApiOrderTotalPriceResponse, ApiUpdateOrderResponse } from "../responses/orders";



export function ApiFindAllOrdersDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all orders with pagination' }),
        ApiParam({
            name: 'limit',
            description: 'Number of orders per page',
            required: true,
            schema: {
                type: 'integer',
                example: 10,
            },
        }),
        ApiParam({
            name: 'page',
            description: 'Page number to fetch orders',
            required: true,
            schema: {
                type: 'integer',
                example: 1,
            },
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'List of orders fetched successfully',
            type: ApiFetchOrdersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid query parameters',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No orders found',
        }),
    );
}

export function ApiFindOrdersByCustomerDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Get orders by customer ID' }),
        ApiParam({
            name: 'customerId',
            description: 'The ID of the customer to retrieve orders for',
            required: true,
            schema: {
                type: 'string',
                example: 'customerIdExample123',
            },
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Orders fetched successfully for the customer',
            type: ApiFetchOrdersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid customer ID',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No orders found for the specified customer',
        }),
    );
}

export function ApiFindOrdersByProductDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Get orders by product ID' }),
        ApiParam({
            name: 'productId',
            description: 'The product ID to retrieve orders for',
            required: true,
            schema: {
                type: 'string',
                example: 'productIdExample123',
            },
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Orders fetched successfully for the product',
            type: ApiFetchOrdersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid product ID',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No orders found for the specified product',
        }),
    );
}

export function ApiFindOrdersByStatusDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Get orders by order status' }),
        ApiParam({
            name: 'status',
            description: 'The status of orders to retrieve',
            required: true,
            schema: {
                type: 'string',
                example: 'PENDING',
            },
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Orders fetched successfully for the specified status',
            type: ApiFetchOrdersResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid status value',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'No orders found for the specified status',
        }),
    );
}

export function ApiFindOneOrderDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve a specific order by its ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the order to retrieve',
            required: true,
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Order details fetched successfully',
            type: ApiFetchOrderResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing order ID',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Order not found for the specified ID',
        }),
    );
}

export function ApiGetTotalPriceDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Calculate the total price of an order' }),
        ApiParam({
            name: 'orderId',
            description: 'The MongoDB ObjectId of the order to calculate the price for',
            required: true,
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Total price of the order calculated successfully',
            type: ApiOrderTotalPriceResponse,
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing order ID',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Order not found for the specified ID',
        }),
    );
}

export function ApiCreateOrderDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new order' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Order created successfully.',
            type: ApiCreateOrderResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input data.'
        })
    );
}


export function ApiUpdateOrderDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Update a specific order by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the order to update. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The order was successfully updated.',
            type: ApiUpdateOrderResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid input or MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Order not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while updating the order.',
        })
    );
}

export function ApiDeleteOrderDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a specific order by its MongoDB ID' }),
        ApiParam({
            name: 'id',
            description: 'The MongoDB ObjectId of the order to delete. Must be a 24-character hexadecimal string.',
            schema: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$',
                example: '64f68c81b5c8d15a1a2f5b43',
            },
            required: true,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'The order was successfully deleted.',
            type: ApiDeleteOrderResponse
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid or missing MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Order not found for the specified MongoDB ObjectId.',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'An unexpected error occurred while deleting the order.',
        })
    );
}
