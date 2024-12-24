export enum OrderStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
}

export interface IOrder {
    customerId: string;
    productId: string;
    quantity: number;
    status: OrderStatus;
    totalPrice: number;
    shippingAddress: string;
}

export interface IOrderUpdate {
    status?: OrderStatus;
    shippingAddress?: string;
    totalPrice?: number;
}
