import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { IApiCategoriesResponse } from '../interfaces/category.interface';
import { CategoryModel } from '../models/category.model.ts';
import { Model } from 'mongoose';
import { catchError, from, map, Observable, of } from 'rxjs';
import { IApiServiceError } from '../interfaces/common.interface.js';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(CategoryModel.name) private categoryModel: Model<CategoryModel>
    ) { }

    findAll() {
        return from(
            this.categoryModel
                .find()
                .exec()
        ).pipe(
            map((brands): IApiCategoriesResponse => {
                if (!brands.length) {
                    throw new NotFoundException('Brands not found')
                } else {
                    return {
                        ok: true,
                        message: 'Brands fetched successfully!',
                        data: brands,
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

    findOne(id: string) {
        return from(
            this.categoryModel
                .findById(id)
                .exec()
        ).pipe(
            map((product): IApiCategoriesResponse => {
                if (!product) {
                    throw new NotFoundException('Category not found')
                } else {
                    return {
                        ok: true,
                        message: 'Category fetched successfully!',
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

    create(category: CreateCategoryDto) {
        return from(this.categoryModel.create(category)).pipe(
            map((savedProduct): IApiCategoriesResponse => (
                {
                    ok: true,
                    message: 'Category created successfully!',
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

    update(id: string, payload: UpdateCategoryDto) {
        return this.findOne(id)
            .pipe(
                map((response) => {
                    if (!response.ok) {
                        return response
                    }
                    return from(
                        this.categoryModel.findOneAndUpdate({ _id: id }, payload)
                    ).pipe(
                        map((brandToUpdate): IApiCategoriesResponse => {
                            if (!brandToUpdate) {
                                throw new BadRequestException('The category could not be updated.')
                            } else {
                                return {
                                    ok: true,
                                    message: 'Category updated successfully!',
                                    data: brandToUpdate,
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
            map((response) => {
                if (!response.ok) {
                    return response
                }

                return from(this.categoryModel.findOneAndDelete({ _id: id })).pipe(
                    map((productDeleted): IApiCategoriesResponse => {
                        if (!productDeleted) {
                            throw new BadRequestException('The category could not be deleted.')
                        } else {
                            return {
                                ok: true,
                                message: 'Category deleted successfully!',
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
