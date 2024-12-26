import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ROUTES } from 'src/constants/routes';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/orders.dto';
import { OrderStatus } from 'src/users/interfaces/order.interface';
import { OrdersService } from 'src/users/services/orders.service';


@Controller(ROUTES.ORDERS.BASE)
export class OrdersController {

    constructor(private orderService: OrdersService) { }


    @ApiOperation({ summary: 'Create a new order' })
    @Post(ROUTES.ORDERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() order: CreateOrderDto) {
        const response = this.orderService.create(order)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Get all orders' })
    @ApiQuery({ name: 'limit', type: 'number', example: 15, required: false, description: 'Number to limit products', minimum: 1, default: 15 })
    @ApiQuery({ name: 'page', type: 'number', example: 2, required: false, description: 'Current page', minimum: 1, default: 1 })
    @Get(ROUTES.ORDERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
        const response = this.orderService.findAll(limit, page)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Search orders by many field' })
    @ApiQuery({ name: 's', type: 'string', example: 'delivered', required: false, description: 'Any match in the order', default: '' })
    @Get(ROUTES.ORDERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        const response = this.orderService.search(search)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Get orders by status' })
    @ApiParam({ name: 'status', type: 'string', enum: OrderStatus, example: 'pending', required: false, description: 'Any order state' })
    @Get(ROUTES.ORDERS.GET_BY_STATUS)
    @HttpCode(HttpStatus.OK)
    getByStatus(@Param('status') status: OrderStatus) {
        const response = this.orderService.findByStatus(status)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Get orders by customer' })
    @ApiParam({ name: 'id', type: 'string', example: '5', required: false, description: 'Customer id' })
    @Get(ROUTES.ORDERS.GET_BY_CUSTOMER)
    @HttpCode(HttpStatus.OK)
    getByCustomer(@Param('id') customerId: OrderStatus) {
        const response = this.orderService.findAllByCustomer(customerId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Get order details' })
    @ApiParam({ name: 'id', type: 'string', example: '5', required: false, description: 'Order id' })
    @Get(ROUTES.ORDERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') orderId: string) {
        const response = this.orderService.findOne(orderId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Update an order' })
    @ApiParam({ name: 'id', type: 'string', example: '5', required: false, description: 'Order id' })
    @Put(ROUTES.ORDERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') orderId: string, @Body() order: UpdateOrderDto) {
        const response = this.orderService.update(orderId, order)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Delete an order' })
    @ApiParam({ name: 'id', type: 'string', example: '5', required: false, description: 'Order id' })
    @Delete(ROUTES.ORDERS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') orderId: string) {
        const response = this.orderService.delete(orderId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @ApiOperation({ summary: 'Get total price of one order' })
    @ApiParam({ name: 'id', type: 'string', example: '5', required: false, description: 'Order id' })
    @Get(ROUTES.ORDERS.GET_TOTAL_PRICE)
    @HttpCode(HttpStatus.OK)
    getTotal(@Param('id') orderId: string) {
        const response = this.orderService.calculateTotalPrice(orderId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }
}
