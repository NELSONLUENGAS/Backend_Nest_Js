import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put
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

@Controller(ROUTES.CATEGORIES.BASE)
export class CategoriesController {
    constructor(private categoryService: CategoriesService) { }

    @Post(ROUTES.CATEGORIES.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateCategoryDocumentation()
    create(@Body() category: CreateCategoryDto) {
        return this.categoryService.create(category)
    }

    @Get(ROUTES.CATEGORIES.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiFindAllCategoriesDocumentation()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(ROUTES.CATEGORIES.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiFindOneCategoryDocumentation()
    findOne(@Param('id', MongoIdPipe) categoryId: string) {
        return this.categoryService.findOne(categoryId)
    }


    @Put(ROUTES.CATEGORIES.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiUpdateCategoryDocumentation()
    update(@Param('id', MongoIdPipe) categoryId: string, @Body() category: UpdateCategoryDto) {
        return this.categoryService.update(categoryId, category)
    }

    @Delete(ROUTES.CATEGORIES.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiDeleteCategoryDocumentation()
    delete(@Param('id', MongoIdPipe) categoryId: string) {
        return this.categoryService.delete(categoryId)
    }
}
