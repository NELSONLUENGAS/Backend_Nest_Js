import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let mockUsersService: jest.Mocked<Omit<UsersController, 'userModel' | ''>>


    beforeEach(async () => {

        mockUsersService = {
            findAll: jest.fn(),
            findByRole: jest.fn(),
            search: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockUsersService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
