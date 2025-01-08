import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BrandModel } from '../models/brand.model';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { IApiServiceError } from '../interfaces/common.interface';
import { IApiBrandsResponse, IBrand } from '../interfaces/brand.interface';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {

    constructor(
        @InjectModel(BrandModel.name) private brandModel: Model<IBrand>
    ) { }

    findAll(): Observable<IApiBrandsResponse | IApiServiceError> {
        return from(this.brandModel.find().exec()).pipe(
            map((brands: IBrand[]) => {
                if (brands.length === 0) {
                    throw new NotFoundException('Brands not found');
                }
                return {
                    ok: true,
                    message: 'Brands fetched successfully!',
                    data: brands.map(brand => ({
                        _id: brand._id,
                        name: brand.name,
                        createdAt: brand.createdAt,
                        updatedAt: brand.updatedAt,
                    })),
                };
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    findOne(id: string): Observable<IApiBrandsResponse | IApiServiceError> {
        return from(this.brandModel.findById(id)).pipe(
            map((brand: IBrand) => {
                if (!brand) {
                    throw new NotFoundException('Brand not found');
                }
                return {
                    ok: true,
                    message: 'Brand fetched successfully!',
                    data: {
                        _id: brand._id,
                        name: brand.name,
                        createdAt: brand.createdAt,
                        updatedAt: brand.updatedAt,
                    },
                };
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    create(brand: CreateBrandDto): Observable<IApiBrandsResponse | IApiServiceError> {
        return from(this.brandModel.create(brand)).pipe(
            map((savedBrand: IBrand) => ({
                ok: true,
                message: 'Brand created successfully!',
                data: {
                    _id: savedBrand._id,
                    name: savedBrand.name,
                    createdAt: savedBrand.createdAt,
                    updatedAt: savedBrand.updatedAt,
                },
            })),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    update(id: string, payload: UpdateBrandDto): Observable<IApiBrandsResponse | IApiServiceError> {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response);
                }

                return from(
                    this.brandModel.findByIdAndUpdate(id, payload, { new: true }).exec()
                ).pipe(
                    map((updatedBrand: IBrand) => {
                        if (!updatedBrand) {
                            throw new BadRequestException('The brand could not be updated.');
                        }
                        return {
                            ok: true,
                            message: 'Brand updated successfully!',
                            data: {
                                _id: updatedBrand._id,
                                name: updatedBrand.name,
                                createdAt: updatedBrand.createdAt,
                                updatedAt: updatedBrand.updatedAt,
                            },
                        };
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error,
                        });
                    })
                );
            })
        );
    }

    delete(id: string): Observable<IApiBrandsResponse | IApiServiceError> {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response);
                }

                return from(this.brandModel.findByIdAndDelete(id).exec()).pipe(
                    map((deletedBrand: IBrand) => {
                        if (!deletedBrand) {
                            throw new BadRequestException('The brand could not be deleted.');
                        }
                        return {
                            ok: true,
                            message: 'Brand deleted successfully!',
                            data: {
                                _id: deletedBrand._id,
                                name: deletedBrand.name,
                                createdAt: deletedBrand.createdAt,
                                updatedAt: deletedBrand.updatedAt,
                            },
                        };
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error,
                        });
                    })
                );
            })
        );
    }
}
