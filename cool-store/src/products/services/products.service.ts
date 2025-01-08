import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductModel } from '../models/product.model';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { IApiServiceError } from '../interfaces/common.interface';
import { IApiProductsResponse } from '../interfaces/product.interface';


@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(ProductModel.name) private productModel: Model<ProductModel>
    ) { }


    findAll(limit: number, page: number) {
        const offset = Math.abs(page - 1) * limit
        return from(
            this.productModel
                .find()
                .skip(offset)
                .limit(limit)
                .populate('brand')
                .populate('category')
                .exec()
        ).pipe(
            map((products): IApiProductsResponse => {
                if (!products.length) {
                    throw new NotFoundException('Products not found')
                } else {
                    return {
                        ok: true,
                        message: 'Products fetched successfully!',
                        data: products,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        );
    }

    findByCategory(name: string) {
        return from(
            this.productModel
                .find()
                .where({
                    category: name
                })
                .exec()
        ).pipe(
            map((products): IApiProductsResponse => {
                if (!products.length) {
                    throw new NotFoundException('Products not found')
                } else {
                    return {
                        ok: true,
                        message: 'Products fetched successfully!',
                        data: products,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        )
    }

    findOne(id: string) {
        return from(
            this.productModel
                .findById(id)
                .exec()
        ).pipe(
            map((product): IApiProductsResponse => {
                if (!product) {
                    throw new NotFoundException('Product not found')
                } else {
                    return {
                        ok: true,
                        message: 'Product fetched successfully!',
                        data: product,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        )
    }

    search(query: string) {
        return of(query).pipe(
            switchMap((queryTerm) => {
                return from(
                    this.productModel
                        .find({
                            $or: [
                                { name: { $regex: queryTerm, $options: 'i' } },
                                { description: { $regex: queryTerm, $options: 'i' } },
                                { category: { $regex: queryTerm, $options: 'i' } },
                            ],
                        }).exec()
                ).pipe(
                    map((products): IApiProductsResponse => {
                        if (!products.length) {
                            throw new NotFoundException('Products not found')
                        } else {
                            return {
                                ok: true,
                                message: 'Products fetched successfully!',
                                data: products,
                            };
                        }
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error
                        })
                    })
                );
            })
        );
    }

    create(product: CreateProductDto) {
        return from(this.productModel.create(product)).pipe(
            map((savedProduct): IApiProductsResponse => (
                {
                    ok: true,
                    message: 'Product created successfully!',
                    data: savedProduct
                }
            )
            ),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error
                })
            })
        );
    }

    update(id: string, payload: UpdateProductDto) {
        return this.findOne(id)
            .pipe(
                switchMap((response) => {
                    if (!response.ok) {
                        return of(response)
                    }
                    return from(
                        this.productModel.findOneAndUpdate({ _id: id }, payload)
                    ).pipe(
                        map((productToUpdate): IApiProductsResponse => {
                            if (!productToUpdate) {
                                throw new BadRequestException('The product could not be updated.')
                            } else {
                                return {
                                    ok: true,
                                    message: 'Product updated successfully!',
                                    data: productToUpdate,
                                };
                            }
                        }),
                        catchError((error): Observable<IApiServiceError> => {
                            return of({
                                ok: false,
                                ...error.response ?? error
                            })
                        })
                    );
                })
            )
    }

    delete(id: string) {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response)
                }

                return from(this.productModel.findOneAndDelete({ _id: id })).pipe(
                    map((productDeleted): IApiProductsResponse => {
                        if (!productDeleted) {
                            throw new BadRequestException('The product could not be deleted.')
                        } else {
                            return {
                                ok: true,
                                message: 'Product deleted successfully!',
                                data: productDeleted,
                            };
                        }
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error
                        })
                    })
                );
            })
        );
    }
}
