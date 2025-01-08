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
    Query,
    UseGuards
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
import { UserRole } from '@users/interfaces/user.interface';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { RolesAccess } from '@auth/decorators/roles.decorator';
import { PublicAccess } from '@auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(ROUTES.PRODUCTS.BASE)
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post(ROUTES.PRODUCTS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @RolesAccess(UserRole.ADMIN, UserRole.SELLER)
    @ApiCreateProductDocumentation()
    create(@Body() product: CreateProductDto) {
        return this.productService.create(product)
    }


    @Get(ROUTES.PRODUCTS.GET_ALL)
    @PublicAccess()
    @HttpCode(HttpStatus.OK)
    @ApiFindAllProductsDocumentation()
    findAll(@Query() queryString: FilterProductDto) {
        const { limit = 15, page = 1 } = queryString
        return this.productService.findAll(limit, page)
    }

    @Get(ROUTES.PRODUCTS.SEARCH)
    @HttpCode(HttpStatus.OK)
    @PublicAccess()
    @ApiSearchProductsDocumentation()
    search(@Query() queryString: SearchProductDto) {
        const { s: search = '' } = queryString
        return this.productService.search(search)
    }

    @Get(ROUTES.PRODUCTS.GET_BY_CATEGORY)
    @HttpCode(HttpStatus.OK)
    @PublicAccess()
    @ApiProductsByCategoryDocumentation()
    findByCategory(@Param('name') categoryName: string) {
        return this.productService.findByCategory(categoryName)
    }

    @Get(ROUTES.PRODUCTS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @PublicAccess()
    @ApiFindOneProductDocumentation()
    findOne(@Param('id', MongoIdPipe) productId: string) {
        return this.productService.findOne(productId)
    }

    @Put(ROUTES.PRODUCTS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN, UserRole.SELLER)
    @ApiUpdateProductDocumentation()
    update(
        @Param('id', MongoIdPipe) productId: string,
        @Body() product: UpdateProductDto
    ) {
        return this.productService.update(productId, product)
    }

    @Delete(ROUTES.PRODUCTS.DELETE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN, UserRole.SELLER)
    @ApiDeleteProductDocumentation()
    delete(@Param('id', MongoIdPipe) productId: string) {
        return this.productService.delete(productId)
    }
}
