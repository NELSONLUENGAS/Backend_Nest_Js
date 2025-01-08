import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './models/product.model';
import { CategoryModel, CategorySchema } from './models/category.model.ts';
import { BrandModel, BrandSchema } from './models/brand.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ProductModel.name,
                schema: ProductSchema
            },
            {
                name: CategoryModel.name,
                schema: CategorySchema
            },
            {
                name: BrandModel.name,
                schema: BrandSchema
            },
        ])
    ],
    controllers: [
        ProductsController,
        CategoriesController,
        BrandsController
    ],
    providers: [
        ProductsService,
        CategoriesService,
        BrandsService
    ],
    exports: [
        ProductsService,
        CategoriesService,
        BrandsService
    ]
})
export class ProductsModule { }
