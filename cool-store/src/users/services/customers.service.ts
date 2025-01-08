import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomerModel } from '../models/customer.model';
import { Model } from 'mongoose';
import { catchError, from, map, Observable, of } from 'rxjs';
import { IApiServiceError } from '../interfaces/common.interface';

@Injectable()
export class CustomersService {

    constructor(
        @InjectModel(CustomerModel.name) private customerModel: Model<CustomerModel>
    ) { }

    findAll(limit: number, page: number) {
        const offset = Math.abs(page - 1) * limit;

        return from(
            this.customerModel
                .find()
                .skip(offset)
                .limit(limit)
                .populate('orders')
                .exec()
        ).pipe(
            map((customers) => {
                if (!customers.length) {
                    return {
                        ok: false,
                        data: [],
                        msg: 'No customers found',
                    };
                } else {
                    return {
                        ok: true,
                        msg: 'Customers fetched successfully!',
                        data: customers,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    findOne(id: string) {
        return from(
            this.customerModel
                .findOne({ id })
                .populate('orders')
                .exec()
        ).pipe(
            map((customer) => {
                if (!customer) {
                    return {
                        ok: false,
                        data: {},
                        msg: 'Customer not found',
                    };
                } else {
                    return {
                        ok: true,
                        data: customer,
                        msg: 'Customer fetched successfully!',
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    search(query: string) {
        return from(
            this.customerModel
                .find()
                .or([
                    { firstName: { $regex: query, $options: 'i' } },
                    { lastName: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { phone: { $regex: query, $options: 'i' } },
                ])
                .exec()
        ).pipe(
            map((customers) => {
                if (!customers.length) {
                    return {
                        ok: false,
                        data: [],
                        msg: 'No customers found',
                    };
                } else {
                    return {
                        ok: true,
                        msg: 'Customers fetched successfully!',
                        data: customers,
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    create(customer: CreateCustomerDto) {
        return from(
            this.customerModel.create({
                ...customer,
            })
        ).pipe(
            map((savedCustomer) => {
                return {
                    ok: true,
                    data: savedCustomer,
                    msg: 'Customer created successfully!',
                };
            }),
            catchError((error): Observable<IApiServiceError> =>
                of({
                    ok: false,
                    ...error.response ?? error,
                })
            )
        );
    }

    update(id: string, customerUpdated: UpdateCustomerDto) {
        return from(
            this.customerModel
                .findOneAndUpdate({ id }, customerUpdated, { new: true })
                .exec()
        ).pipe(
            map((updatedCustomer) => {
                if (!updatedCustomer) {
                    return {
                        ok: false,
                        data: {},
                        msg: 'Customer not found',
                    };
                } else {
                    return {
                        ok: true,
                        data: updatedCustomer,
                        msg: 'Customer updated successfully!',
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    delete(id: string) {
        return from(
            this.customerModel
                .findOneAndDelete({ id })
                .exec()
        ).pipe(
            map((deletedCustomer) => {
                if (!deletedCustomer) {
                    return {
                        ok: false,
                        data: {},
                        msg: 'Customer not found',
                    };
                } else {
                    return {
                        ok: true,
                        data: deletedCustomer,
                        msg: 'Customer deleted successfully!',
                    };
                }
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }
}
