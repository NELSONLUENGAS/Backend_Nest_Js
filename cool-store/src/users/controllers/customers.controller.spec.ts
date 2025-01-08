import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from '../services/customers.service';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { OrderModel } from '../models/order.model';

jest.mock('../models/customer.model', () => ({
    CustomerModel: { name: 'CustomerModel' },
}));

jest.mock('../models/order.model', () => ({
    OrderModel: { name: 'OrderModel' },
}));

describe('CustomersController', () => {
    let controller: CustomersController;
    let mockCustomerService: jest.Mocked<Omit<CustomersService, 'customerModel'>>


    beforeEach(async () => {

        mockCustomerService = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            search: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomersController],
            providers: [
                {
                    provide: CustomersService,
                    useValue: mockCustomerService
                },
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
                {
                    provide: getModelToken(OrderModel.name),
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

        controller = module.get<CustomersController>(CustomersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
