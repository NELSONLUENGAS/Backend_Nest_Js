import { IProduct } from "@products/interfaces/product.interface";
import { OrderModel } from "../models/order.model";
import { IApiServiceResponse } from "./common.interface";

export enum OrderStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}
export interface IOrder extends Document {
    _id: string;
    customerId: string;
    status: OrderStatus;
    totalPrice: number;
    shippingAddress: string;
    orderItems: IOrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
    _id: string;
    orderId: string | IOrder;
    productId: string | IProduct;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IApiOrdersResponse extends IApiServiceResponse {
    data: OrderModel | OrderModel[]
    totalPrice?: number
}
