import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ApiFetchOrdersResponse, } from "../responses/orders";



export function ApiProfileFindAllOrdersDocumentation() {
    return applyDecorators(
        ApiOperation({ summary: 'List all orders' }),
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
