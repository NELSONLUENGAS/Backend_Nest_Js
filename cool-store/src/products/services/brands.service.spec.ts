import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { BrandsService } from "./brands.service";
import { BrandModel, BrandSchema } from "../models/brand.model";
import { Test, TestingModule } from "@nestjs/testing";

describe('BrandsService', () => {
    let service: BrandsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost/cool-store'),
                MongooseModule.forFeature([
                    {
                        name: BrandModel.name,
                        schema: BrandSchema
                    }
                ]),
            ],
            providers: [
                BrandsService,
                {
                    provide: getModelToken(BrandModel.name),
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

        service = module.get<BrandsService>(BrandsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
