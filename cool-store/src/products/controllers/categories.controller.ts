import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/categories.dto';
import { CategoriesService } from 'src/products/services/categories.service';

@Controller(ROUTES.CATEGORIES.BASE)
export class CategoriesController {

    constructor(private categoryService: CategoriesService) { }

    @Post(ROUTES.CATEGORIES.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: CreateCategoryDto) {

    }

    @Get(ROUTES.CATEGORIES.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll() {

    }

    @Get(ROUTES.CATEGORIES.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') categoryId: string) {

    }

    @Put(ROUTES.CATEGORIES.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') categoryId: string, @Body() category: UpdateCategoryDto) {

    }

    @Delete(ROUTES.CATEGORIES.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') categoryId: string) {

    }
}
