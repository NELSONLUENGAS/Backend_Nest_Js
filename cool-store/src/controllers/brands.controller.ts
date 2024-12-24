import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { IBrand, IBrandUpdate } from 'src/interfaces/brand.interface';

@Controller(ROUTES.BRANDS.BASE)
export class BrandsController {
    @Post(ROUTES.BRANDS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() brand: IBrand) {

        // Lógica para crear una marca
    }

    @Get(ROUTES.BRANDS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
        // Lógica para obtener todas las marcas con paginación
    }

    @Get(ROUTES.BRANDS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        // Lógica para buscar marcas por término
    }

    @Get(ROUTES.BRANDS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') brandId: string) {
        // Lógica para obtener una marca específica por ID
    }

    @Put(ROUTES.BRANDS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') brandId: string, @Body() brand: IBrandUpdate) {
        // Lógica para actualizar una marca
    }

    @Delete(ROUTES.BRANDS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') brandId: string) {
        // Lógica para eliminar una marca
    }
}
