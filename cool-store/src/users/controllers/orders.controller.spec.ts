import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { OrderModel } from '../models/order.model';
import { OrderItemModel } from '../models/orderItem.model';

jest.mock('../models/order.model', () => ({
    OrderModel: { name: 'OrderModel' },
}));

jest.mock('../models/orderItem.model', () => ({
    OrderItemModel: { name: 'OrderItemModel' },
}));

describe('OrdersController', () => {
    let controller: OrdersController;
    let mockOrdersService: jest.Mocked<Omit<OrdersService, 'orderModel' | 'orderItemModel'>>


    beforeEach(async () => {

        mockOrdersService = {
            findAll: jest.fn(),
            findByCustomer: jest.fn(),
            findByProduct: jest.fn(),
            findByStatus: jest.fn(),
            findOne: jest.fn(),
            getTotalPrice: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                {
                    provide: OrdersService,
                    useValue: mockOrdersService
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
                {
                    provide: getModelToken(OrderItemModel.name),
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

        controller = module.get<OrdersController>(OrdersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
