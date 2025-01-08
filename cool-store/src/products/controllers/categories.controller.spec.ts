import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from '@products/services/categories.service';

describe('CategoriesController', () => {
    let controller: CategoriesController;
    let mockCategoriesService: any


    beforeEach(async () => {

        mockCategoriesService = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [
                { provide: CategoriesService, useValue: mockCategoriesService },
            ],
        }).compile();

        controller = module.get<CategoriesController>(CategoriesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
