import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { IProductCreate, IProductUpdate } from 'src/interfaces/product.interface';
import { ProductsService } from 'src/services/products.service';

@Controller(ROUTES.PRODUCTS.BASE)
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @Post(ROUTES.PRODUCTS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() product: IProductCreate) {
        const response = this.productService.create(product)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.PRODUCTS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
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
    update(@Param('id') productId: string, @Body() product: IProductUpdate) {
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
