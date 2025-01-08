import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoryModel, CategorySchema } from '../models/category.model.ts';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('CategoriesService', () => {
    let service: CategoriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/cool-store'),
                MongooseModule.forFeature([
                    {
                        name: CategoryModel.name,
                        schema: CategorySchema
                    }
                ]),
            ],
            providers: [
                CategoriesService,
                {
                    provide: getModelToken(CategoryModel.name),
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

        service = module.get<CategoriesService>(CategoriesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
