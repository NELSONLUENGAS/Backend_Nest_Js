import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { IOrder, IOrderUpdate } from 'src/interfaces/order.interface';

@Controller(ROUTES.ORDERS.BASE)
export class OrdersController {
    @Post(ROUTES.ORDERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() order: IOrder) {
        // Lógica para crear una nueva orden
    }

    @Get(ROUTES.ORDERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
        // Lógica para obtener todas las órdenes con paginación
    }

    @Get(ROUTES.ORDERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        // Lógica para buscar órdenes por término
    }

    @Get(ROUTES.ORDERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') orderId: string) {
        // Lógica para obtener una orden por ID
    }

    @Put(ROUTES.ORDERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') orderId: string, @Body() order: IOrderUpdate) {
        // Lógica para actualizar una orden
    }

    @Delete(ROUTES.ORDERS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') orderId: string) {
        // Lógica para eliminar una orden
    }
}
