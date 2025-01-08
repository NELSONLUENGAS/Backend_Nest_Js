import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from '../services/brands.service';
import { of } from 'rxjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IApiBrandsResponse } from '../interfaces/brand.interface';
import { CreateBrandDto } from '../dtos/brands.dto';
import { lastValueFrom } from 'rxjs';



describe('BrandsController', () => {
    let controller: BrandsController;
    let mockBrandService: jest.Mocked<Omit<BrandsService, 'brandModel'>>


    beforeEach(async () => {

        mockBrandService = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [BrandsController],
            providers: [
                { provide: BrandsService, useValue: mockBrandService },
            ],
        }).compile();

        controller = module.get<BrandsController>(BrandsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new brand', async () => {
            const createBrandDto: CreateBrandDto = { name: 'Brand A' };
            const mockResponse: IApiBrandsResponse = {
                ok: true,
                message: 'Brand created successfully!',
                data: {
                    _id: '1',
                    name: 'Brand A',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            };

            mockBrandService.create.mockReturnValue(of(mockResponse));

            const result = await lastValueFrom(controller.create(createBrandDto));

            expect(result).toEqual(mockResponse);
            expect(mockBrandService.create).toHaveBeenCalledWith(createBrandDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of brands', async () => {
            const mockResponse: IApiBrandsResponse = {
                ok: true,
                message: 'Brands fetched successfully!',
                data: [
                    {
                        _id: '1',
                        name: 'Brand A',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        _id: '2',
                        name: 'Brand B',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
            };

            mockBrandService.findAll.mockReturnValue(of(mockResponse));

            const result = await lastValueFrom(controller.findAll());

            expect(result).toEqual(expect.objectContaining({
                ok: true,
                message: 'Brands fetched successfully!',
                data: expect.arrayContaining([
                    expect.objectContaining({
                        name: 'Brand A',
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    }),
                    expect.objectContaining({
                        name: 'Brand B',
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    }),
                ]),
            }));
            expect(mockBrandService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single brand when valid ObjectId is provided', async () => {
            const mockResponse: IApiBrandsResponse = {
                ok: true,
                message: 'Brand fetched successfully!',
                data: {
                    _id: '6778758bf58aff566e3bf478',
                    name: 'PhotoGenius',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            };

            // Mockea el retorno de la función findOne
            mockBrandService.findOne.mockReturnValue(of(mockResponse));

            // Usa lastValueFrom para esperar el valor de la promesa que devuelve el observable
            const result = await lastValueFrom(controller.findOne('6778758bf58aff566e3bf478'));

            expect(result).toEqual(mockResponse); // Verifica que el resultado sea igual al mock
            expect(mockBrandService.findOne).toHaveBeenCalledWith('6778758bf58aff566e3bf478');
        });

        it('should return a response indicating "Brand not found" if the ObjectId does not exist in the database', async () => {
            const mockResponse = {
                ok: false,
                message: 'Brand not found',
                error: 'Not Found',
                statusCode: 404,
            };

            mockBrandService.findOne.mockReturnValue(of(mockResponse));

            const result = await lastValueFrom(controller.findOne('6778758bf58aff566e3bf477'));

            expect(result).toEqual(mockResponse);
            expect(mockBrandService.findOne).toHaveBeenCalledWith('6778758bf58aff566e3bf477');
        });

        it('should return a BadRequest response if the ObjectId is invalid', async () => {
            const invalidId = '6778758bf58aff566e3bf4';

            const mockResponse = {
                ok: false,
                message: '6778758bf58aff566e3bf47 is not a valid Object Id',
                error: 'Bad Request',
                statusCode: 400,
            };

            mockBrandService.findOne.mockReturnValue(of(mockResponse));

            const result = await lastValueFrom(controller.findOne(invalidId));

            expect(result).toEqual(mockResponse);
            expect(mockBrandService.findOne).toHaveBeenCalledWith(invalidId);
        });
    });

    describe('update', () => {
        it('should update a brand successfully', async () => {
            const updateBrandDto = { name: 'Updated Brand' };
            const mockResponse: IApiBrandsResponse = {
                ok: true,
                message: 'Brand updated successfully!',
                data: {
                    _id: '1',
                    name: 'Updated Brand',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            };

            // Configuración del mock para el servicio (Devolver un Observable correctamente)
            mockBrandService.update.mockReturnValue(of(mockResponse));

            // Usar lastValueFrom para convertir el Observable en una promesa
            const result = await lastValueFrom(controller.update('1', updateBrandDto));

            expect(result).toEqual(mockResponse);
            expect(mockBrandService.update).toHaveBeenCalledWith('1', updateBrandDto);
        });
    });

    // describe('delete', () => {
    //     it('should delete a brand successfully', async () => {
    //         const mockResponse: IApiBrandsResponse = {
    //             ok: true,
    //             message: 'Brand deleted successfully!',
    //             data: {
    //                 _id: '1',
    //                 name: 'Brand A',
    //                 createdAt: new Date(),
    //                 updatedAt: new Date(),
    //             },
    //         };

    //         // Configuración del mock para el servicio (Devolver un Observable correctamente)
    //         mockBrandService.delete.mockReturnValue(of(mockResponse));

    //         // Usar lastValueFrom para convertir el Observable en una promesa
    //         const result = await lastValueFrom(controller.delete('1'));

    //         expect(result).toEqual(mockResponse);
    //         expect(mockBrandService.delete).toHaveBeenCalledWith('1');
    //     });
    // });
});
