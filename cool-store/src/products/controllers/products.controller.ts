import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
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
        return this.productService.create(product)
            .pipe(
                switchMap(response => response.ok
                    ? of(response)
                    : throwError(() => new BadRequestException('Invalid body parameters'))
                )
            )
    }

    @Get(ROUTES.PRODUCTS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'List all products' })
    @ApiQuery({ name: 'limit', type: 'number', example: 15, required: false, description: 'Number to limit products', minimum: 1, default: 15 })
    @ApiQuery({ name: 'page', type: 'number', example: 2, required: false, description: 'Current page', minimum: 1, default: 1 })
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
        return this.productService.findAll(limit, page)
            .pipe(
                switchMap(response => response.ok
                    ? of(response)
                    : throwError(() => new NotFoundException('Products not found'))
                )
            )
    }

    @Get(ROUTES.PRODUCTS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {

        return this.productService.search(search)
            .pipe(
                switchMap(response => response.ok
                    ? of(response)
                    : throwError(() => new NotFoundException('Products not found'))
                )
            )
    }

    @Get(ROUTES.PRODUCTS.GET_BY_CATEGORY)
    @HttpCode(HttpStatus.OK)
    getByCategory(@Param('name') categoryName: string) {
        return this.productService.findByCategory(categoryName)
            .pipe(
                switchMap(response => response.ok
                    ? of(response)
                    : throwError(() => new NotFoundException('Products not found'))
                )
            )
    }

    @Get(ROUTES.PRODUCTS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') productId: string) {
        return this.productService.findOne(productId)
            .pipe(
                switchMap((response) => response.ok
                    ? of(response)
                    : throwError(() => new NotFoundException('Product not found')))
            )
    }

    @Put(ROUTES.PRODUCTS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') productId: string, @Body() product: UpdateProductDto) {
        return this.productService.update(productId, product)
            .pipe(
                switchMap((response) => response.ok
                    ? of(response)
                    : throwError(() => new NotFoundException('Product not found')))
            )
    }

    @Delete(ROUTES.PRODUCTS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') productId: string) {
        return this.productService.delete(productId)
            .pipe(
                switchMap((response) => response.ok
                    ? of(response)
                    : throwError(() => new NotFoundException('Product not found')))
            )
    }
}
