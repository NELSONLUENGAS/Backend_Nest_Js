import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';
import { CustomersService } from 'src/services/customers.service';

@Controller(ROUTES.CUSTOMERS.BASE)
export class CustomersController {

    constructor(private customerService: CustomersService) { }

    @Post(ROUTES.CUSTOMERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() customer: CreateCustomerDto) {
        const response = this.customerService.create(customer)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.CUSTOMERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 20, @Query('page') page = 1) {
        const response = this.customerService.findAll(limit, page)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.CUSTOMERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        const response = this.customerService.search(search)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.CUSTOMERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') customerId: string) {
        const response = this.customerService.findOne(customerId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Put(ROUTES.CUSTOMERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') customerId: string, @Body() customer: UpdateCustomerDto) {
        const response = this.customerService.update(customerId, customer)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Delete(ROUTES.CUSTOMERS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') customerId: string) {
        const response = this.customerService.delete(customerId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }
}
