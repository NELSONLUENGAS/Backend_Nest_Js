import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { ROUTES } from '../../constants/routes';
import {
    CreateProductDto,
    FilterProductDto,
    SearchProductDto,
    UpdateProductDto
} from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';
import {
    ApiCreateProductDocumentation,
    ApiDeleteProductDocumentation,
    ApiFindAllProductsDocumentation,
    ApiFindOneProductDocumentation,
    ApiProductsByCategoryDocumentation,
    ApiSearchProductsDocumentation,
    ApiUpdateProductDocumentation
} from '../api/decorators/products';

@Controller(ROUTES.PRODUCTS.BASE)
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post(ROUTES.PRODUCTS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateProductDocumentation()
    create(@Body() product: CreateProductDto) {
        return this.productService.create(product)
    }

    @Get(ROUTES.PRODUCTS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiFindAllProductsDocumentation()
    findAll(@Query() queryString: FilterProductDto) {
        const { limit = 15, page = 1 } = queryString
        return this.productService.findAll(limit, page)
    }

    @Get(ROUTES.PRODUCTS.SEARCH)
    @HttpCode(HttpStatus.OK)
    @ApiSearchProductsDocumentation()
    search(@Query() queryString: SearchProductDto) {
        const { s: search = '' } = queryString
        return this.productService.search(search)
    }

    @Get(ROUTES.PRODUCTS.GET_BY_CATEGORY)
    @HttpCode(HttpStatus.OK)
    @ApiProductsByCategoryDocumentation()
    findByCategory(@Param('name') categoryName: string) {
        return this.productService.findByCategory(categoryName)
    }

    @Get(ROUTES.PRODUCTS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiFindOneProductDocumentation()
    findOne(@Param('id', MongoIdPipe) productId: string) {
        return this.productService.findOne(productId)
    }

    @Put(ROUTES.PRODUCTS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiUpdateProductDocumentation()
    update(
        @Param('id', MongoIdPipe) productId: string,
        @Body() product: UpdateProductDto
    ) {
        return this.productService.update(productId, product)
    }

    @Delete(ROUTES.PRODUCTS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiDeleteProductDocumentation()
    delete(@Param('id', MongoIdPipe) productId: string) {
        return this.productService.delete(productId)
    }
}
