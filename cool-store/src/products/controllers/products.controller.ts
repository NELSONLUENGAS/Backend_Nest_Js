import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ROUTES } from 'src/constants/routes';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products.service';

@Controller(ROUTES.PRODUCTS.BASE)
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @Post(ROUTES.PRODUCTS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new product' })
    create(@Body() product: CreateProductDto) {
        const response = this.productService.create(product)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.PRODUCTS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'List all products' })
    @ApiQuery({ name: 'limit', type: 'number', example: 15, required: false, description: 'Number to limit products', minimum: 1, default: 15 })
    @ApiQuery({ name: 'page', type: 'number', example: 2, required: false, description: 'Current page', minimum: 1, default: 1 })
    getAll(@Query('limit', ParseIntPipe) limit = 15, @Query('page', ParseIntPipe) page = 1) {
        const response = this.productService.findAll(limit, page)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.PRODUCTS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        const response = this.productService.search(search)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.PRODUCTS.GET_ALL_BY_CATEGORY)
    @HttpCode(HttpStatus.OK)
    getAllByCategory(@Param('name') categoryName: string) {
        const response = this.productService.findAllByCategory(categoryName)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.PRODUCTS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') productId: string) {
        const response = this.productService.findOne(productId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Put(ROUTES.PRODUCTS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') productId: string, @Body() product: UpdateProductDto) {
        const response = this.productService.update(productId, product)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Delete(ROUTES.PRODUCTS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') productId: string) {
        const response = this.productService.delete(productId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }
}
