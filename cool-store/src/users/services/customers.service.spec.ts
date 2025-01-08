import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';

jest.mock('../models/customer.model', () => ({
    CustomerModel: { name: 'CustomerModel' },
}));

describe('CustomerService', () => {
    let service: CustomersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CustomersService,
                {
                    provide: getModelToken(CustomerModel.name),
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

        service = module.get<CustomersService>(CustomersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
