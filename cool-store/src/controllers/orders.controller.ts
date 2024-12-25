import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/orders.dto';
import { OrderStatus } from 'src/interfaces/order.interface';
import { OrdersService } from 'src/services/orders.service';


@Controller(ROUTES.ORDERS.BASE)
export class OrdersController {

    constructor(private orderService: OrdersService) { }

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

    @Get(ROUTES.ORDERS.GET_BY_STATUS)
    @HttpCode(HttpStatus.OK)
    getByStatus(@Param('id') status: OrderStatus) {
        const response = this.orderService.findByStatus(status)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

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
}
