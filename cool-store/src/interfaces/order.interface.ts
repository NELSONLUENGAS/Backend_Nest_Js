export enum OrderStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
}

export interface IOrder {
    id: string
    customerId: string;
    productId: string;
    quantity: number;
    status: OrderStatus;
    totalPrice: number;
    shippingAddress: string;
}
