import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { IApiOrdersResponse, OrderStatus } from '../interfaces/order.interface';
import { OrderModel } from '../models/order.model';
import { Model } from 'mongoose';
import { IApiServiceError } from '../interfaces/common.interface';
import { OrderItemModel } from '../models/orderItem.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(OrderModel.name) private orderModel: Model<OrderModel>,
        @InjectModel(OrderItemModel.name) private orderItemModel: Model<OrderItemModel>
    ) { }


    findAll(limit: number, page: number): Observable<IApiOrdersResponse | IApiServiceError> {
        const offset = Math.abs(page - 1) * limit;
        return from(
            this.orderModel
                .find()
                .skip(offset)
                .limit(limit)
                .populate('orderItems')
                .exec()
        ).pipe(
            map((orders) => {
                if (!orders.length) {
                    throw new NotFoundException('Orders not found');
                } else {
                    return {
                        ok: true,
                        message: 'Orders fetched successfully!',
                        data: orders,
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

    findByCustomer(customerId: string): Observable<IApiOrdersResponse | IApiServiceError> {
        return from(
            this.orderModel
                .find({ customerId: customerId })
                .populate('orderItems')
                .exec()
        ).pipe(
            map((orders) => {
                if (!orders.length) {
                    throw new NotFoundException('Orders not found');
                } else {
                    return {
                        ok: true,
                        message: 'Orders fetched successfully!',
                        data: orders,
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

    findByProduct(productId: string): Observable<IApiOrdersResponse | IApiServiceError> {
        return from(
            this.orderModel
                .find({ 'orderItems.productId': productId })
                .populate('orderItems')
                .exec()
        ).pipe(
            map((orders) => {
                if (!orders.length) {
                    throw new NotFoundException('Orders not found');
                } else {
                    return {
                        ok: true,
                        message: 'Orders fetched successfully!',
                        data: orders,
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

    findByStatus(status: OrderStatus): Observable<IApiOrdersResponse | IApiServiceError> {
        return from(
            this.orderModel
                .find({ status: status })
                .populate('orderItems')
                .exec()
        ).pipe(
            map((orders) => {
                if (!orders.length) {
                    throw new NotFoundException('Orders not found');
                } else {
                    return {
                        ok: true,
                        message: 'Orders fetched successfully!',
                        data: orders,
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

    findOne(id: string): Observable<IApiOrdersResponse | IApiServiceError> {
        return from(
            this.orderModel
                .findById(id)
                .populate('orderItems')
                .exec()
        ).pipe(
            map((order: OrderModel) => {
                if (!order) {
                    throw new NotFoundException('Order not found');
                } else {
                    return {
                        ok: true,
                        message: 'Order fetched successfully!',
                        data: order,
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

    getTotalPrice(orderId: string): Observable<IApiOrdersResponse | IApiServiceError> {
        return from(
            this.orderModel
                .findById(orderId)
                .populate('orderItems')
                .exec()
        ).pipe(
            map((order: OrderModel) => {
                if (!order) {
                    throw new NotFoundException('Order not found');
                } else {
                    const totalPrice = order.orderItems.reduce((total, item) => {
                        return total + (item.price * item.quantity);
                    }, 0);

                    return {
                        ok: true,
                        message: 'Total price calculated successfully!',
                        data: [],
                        totalPrice
                    }
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

    create(order: CreateOrderDto): Observable<IApiOrdersResponse | IApiServiceError> {
        const orderItemsData = order.orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }));

        return from(this.orderItemModel.insertMany(orderItemsData)).pipe(
            switchMap((savedOrderItems) => {
                const newOrder = {
                    customerId: order.customerId,
                    status: order.status,
                    shippingAddress: order.shippingAddress,
                    orderItems: savedOrderItems.map(item => item._id),
                    totalPrice: savedOrderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0),
                };

                return from(this.orderModel.create(newOrder)).pipe(
                    switchMap((savedOrder) => {
                        const updateOrderItems = savedOrderItems.map((item) => {
                            return this.orderItemModel.findByIdAndUpdate(
                                item._id,
                                { orderId: savedOrder._id },
                                { new: true }
                            ).exec();
                        });

                        return from(Promise.all(updateOrderItems)).pipe(
                            map(() => ({
                                ok: true,
                                message: 'Order created successfully!',
                                data: savedOrder,
                            })),
                            catchError((error): Observable<IApiServiceError> => {
                                return of({
                                    ok: false,
                                    ...error.response ?? error,
                                });
                            })
                        );
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return from(this.orderItemModel.deleteMany({
                            _id: { $in: savedOrderItems.map(item => item._id) },
                        })).pipe(
                            switchMap(() => of({
                                ok: false,
                                ...error.response ?? error,
                            }))
                        );
                    })
                );
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    update(id: string, payload: UpdateOrderDto): Observable<IApiOrdersResponse | IApiServiceError> {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response);
                }

                return from(
                    this.orderModel.findOneAndUpdate({ _id: id }, payload, { new: true })
                ).pipe(
                    map((updatedOrder) => {
                        if (!updatedOrder) {
                            throw new BadRequestException('The order could not be updated.');
                        }
                        return {
                            ok: true,
                            message: 'Order updated successfully!',
                            data: updatedOrder,
                        };
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error,
                        });
                    })
                );
            }),
            catchError((error): Observable<IApiServiceError> => {
                return of({
                    ok: false,
                    ...error.response ?? error,
                });
            })
        );
    }

    delete(id: string): Observable<IApiOrdersResponse | IApiServiceError> {
        return this.findOne(id).pipe(
            switchMap((response) => {
                if (!response.ok) {
                    return of(response);
                }

                return from(this.orderModel.findOneAndDelete({ _id: id })).pipe(
                    map((orderDeleted): IApiOrdersResponse => {
                        if (!orderDeleted) {
                            throw new BadRequestException('The order could not be deleted.');
                        }
                        return {
                            ok: true,
                            message: 'Order deleted successfully!',
                            data: orderDeleted,
                        };
                    }),
                    catchError((error): Observable<IApiServiceError> => {
                        return of({
                            ok: false,
                            ...error.response ?? error,
                        });
                    })
                );
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
