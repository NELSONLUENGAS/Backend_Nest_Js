import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from 'src/constants/routes';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandsService } from 'src/products/services/brands.service';

@Controller(ROUTES.BRANDS.BASE)
export class BrandsController {
    constructor(private brandService: BrandsService) { }

    @Post(ROUTES.BRANDS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() brand: CreateBrandDto) {
        const response = this.brandService.create(brand)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.BRANDS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll() {
        const response = this.brandService.findAll()

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.BRANDS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') brandId: string) {
        const response = this.brandService.findOne(brandId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Put(ROUTES.BRANDS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') brandId: string, @Body() brand: UpdateBrandDto) {
        const response = this.brandService.update(brandId, brand)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Delete(ROUTES.BRANDS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') brandId: string) {
        const response = this.brandService.delete(brandId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }
}
