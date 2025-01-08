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
    UseGuards
} from '@nestjs/common';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { ROUTES } from '../../constants/routes';
import {
    CreateCategoryDto,
    UpdateCategoryDto
} from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
import {
    ApiCreateCategoryDocumentation,
    ApiDeleteCategoryDocumentation,
    ApiFindAllCategoriesDocumentation,
    ApiFindOneCategoryDocumentation,
    ApiUpdateCategoryDocumentation
} from '../api/decorators/categories';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { UserRole } from '@users/interfaces/user.interface';
import { RolesAccess } from '@auth/decorators/roles.decorator';
import { PublicAccess } from '@auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(ROUTES.CATEGORIES.BASE)
export class CategoriesController {
    constructor(private categoryService: CategoriesService) { }

    @Post(ROUTES.CATEGORIES.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @RolesAccess(UserRole.ADMIN, UserRole.SELLER)
    @ApiCreateCategoryDocumentation()
    create(@Body() category: CreateCategoryDto) {
        return this.categoryService.create(category)
    }

    @Get(ROUTES.CATEGORIES.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @PublicAccess()
    @ApiFindAllCategoriesDocumentation()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(ROUTES.CATEGORIES.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @PublicAccess()
    @ApiFindOneCategoryDocumentation()
    findOne(@Param('id', MongoIdPipe) categoryId: string) {
        return this.categoryService.findOne(categoryId)
    }


    @Put(ROUTES.CATEGORIES.UPDATE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN, UserRole.SELLER)
    @ApiUpdateCategoryDocumentation()
    update(@Param('id', MongoIdPipe) categoryId: string, @Body() category: UpdateCategoryDto) {
        return this.categoryService.update(categoryId, category)
    }

    @Delete(ROUTES.CATEGORIES.DELETE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN, UserRole.SELLER)
    @ApiDeleteCategoryDocumentation()
    delete(@Param('id', MongoIdPipe) categoryId: string) {
        return this.categoryService.delete(categoryId)
    }
}
