import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { ICategory, ICategoryUpdate } from 'src/interfaces/category.interface';

@Controller(ROUTES.CATEGORIES.BASE)
export class CategoriesController {

    @Post(ROUTES.CATEGORIES.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: ICategory) {

    }

    @Get(ROUTES.CATEGORIES.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {

    }

    @Get(ROUTES.CATEGORIES.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {

    }

    @Get(ROUTES.CATEGORIES.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') categoryId: string) {

    }

    @Put(ROUTES.CATEGORIES.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') categoryId: string, @Body() category: ICategoryUpdate) {

    }

    @Delete(ROUTES.CATEGORIES.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') categoryId: string) {

    }
}
