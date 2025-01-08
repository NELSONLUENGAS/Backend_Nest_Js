import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from '../models/product.model';

describe('ProductsServices', () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/cool-store'),
                MongooseModule.forFeature([
                    {
                        name: ProductModel.name,
                        schema: ProductSchema
                    }
                ]),
            ],
            providers: [
                ProductsService,
                {
                    provide: getModelToken(ProductModel.name),
                    useValue: {
                        find: jest.fn(),
                        findById: jest.fn(),
                        create: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
