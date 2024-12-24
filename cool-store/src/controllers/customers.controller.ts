import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { ICustomer, ICustomerUpdate } from 'src/interfaces/customer.interface';

@Controller(ROUTES.CUSTOMERS.BASE)
export class CustomersController {
    @Post(ROUTES.CUSTOMERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() customer: ICustomer) {
        // Lógica para crear un nuevo cliente
    }

    @Get(ROUTES.CUSTOMERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 20, @Query('page') page = 1) {
        // Lógica para obtener todos los clientes con paginación
    }

    @Get(ROUTES.CUSTOMERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        // Lógica para buscar clientes por término
    }

    @Get(ROUTES.CUSTOMERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') customerId: string) {
        // Lógica para obtener un cliente por ID
    }

    @Put(ROUTES.CUSTOMERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') customerId: string, @Body() customer: ICustomerUpdate) {
        // Lógica para actualizar un cliente
    }

    @Delete(ROUTES.CUSTOMERS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') customerId: string) {
        // Lógica para eliminar un cliente
    }
}
