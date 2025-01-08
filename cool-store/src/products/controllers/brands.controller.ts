import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { ROUTES } from '../../constants/routes';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { BrandsService } from '../services/brands.service';
import {
    ApiCreateBrandDocumentation,
    ApiDeleteBrandDocumentation,
    ApiFindAllBrandsDocumentation,
    ApiFindOneBrandDocumentation,
    ApiUpdateBrandDocumentation
} from '../api/decorators/brands';

@Controller(ROUTES.BRANDS.BASE)
export class BrandsController {
    constructor(private brandService: BrandsService) { }

    @Post(ROUTES.BRANDS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateBrandDocumentation()
    create(@Body() brand: CreateBrandDto) {
        return this.brandService.create(brand)
    }

    @Get(ROUTES.BRANDS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiFindAllBrandsDocumentation()
    findAll() {
        return this.brandService.findAll()

    }

    @Get(ROUTES.BRANDS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiFindOneBrandDocumentation()
    findOne(@Param('id', MongoIdPipe) brandId: string) {
        return this.brandService.findOne(brandId)
    }

    @Put(ROUTES.BRANDS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiUpdateBrandDocumentation()
    update(@Param('id', MongoIdPipe) brandId: string, @Body() brand: UpdateBrandDto) {
        return this.brandService.update(brandId, brand)
    }

    @Delete(ROUTES.BRANDS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiDeleteBrandDocumentation()
    delete(@Param('id', MongoIdPipe) brandId: string) {
        return this.brandService.delete(brandId)
    }
}
