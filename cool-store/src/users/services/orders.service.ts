import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/orders.dto';
import { IOrder, OrderStatus } from 'src/users/interfaces/order.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {

    constructor(readonly productService: ProductsService) { }

    private orders: IOrder[] = [
        { id: '1', customerId: '1', productId: '1', quantity: 2, status: OrderStatus.PENDING, totalPrice: 200, shippingAddress: '123 Main St, City, Country' },
        { id: '2', customerId: '2', productId: '2', quantity: 1, status: OrderStatus.SHIPPED, totalPrice: 150, shippingAddress: '456 Elm St, City, Country' },
        { id: '3', customerId: '3', productId: '3', quantity: 3, status: OrderStatus.PENDING, totalPrice: 300, shippingAddress: '789 Oak St, City, Country' },
        { id: '4', customerId: '4', productId: '4', quantity: 2, status: OrderStatus.DELIVERED, totalPrice: 100, shippingAddress: '101 Pine St, City, Country' },
        { id: '5', customerId: '5', productId: '5', quantity: 4, status: OrderStatus.SHIPPED, totalPrice: 400, shippingAddress: '202 Maple St, City, Country' },
        { id: '6', customerId: '6', productId: '6', quantity: 1, status: OrderStatus.PENDING, totalPrice: 50, shippingAddress: '303 Birch St, City, Country' },
        { id: '7', customerId: '7', productId: '7', quantity: 2, status: OrderStatus.DELIVERED, totalPrice: 220, shippingAddress: '404 Cedar St, City, Country' },
        { id: '8', customerId: '8', productId: '8', quantity: 1, status: OrderStatus.PENDING, totalPrice: 120, shippingAddress: '505 Walnut St, City, Country' },
        { id: '9', customerId: '9', productId: '9', quantity: 3, status: OrderStatus.SHIPPED, totalPrice: 300, shippingAddress: '606 Ash St, City, Country' },
        { id: '10', customerId: '10', productId: '10', quantity: 5, status: OrderStatus.PENDING, totalPrice: 500, shippingAddress: '707 Pine St, City, Country' },
        { id: '11', customerId: '11', productId: '11', quantity: 2, status: OrderStatus.DELIVERED, totalPrice: 180, shippingAddress: '808 Oak St, City, Country' },
        { id: '12', customerId: '12', productId: '12', quantity: 1, status: OrderStatus.PENDING, totalPrice: 250, shippingAddress: '909 Birch St, City, Country' },
        { id: '13', customerId: '13', productId: '13', quantity: 3, status: OrderStatus.SHIPPED, totalPrice: 450, shippingAddress: '1010 Cedar St, City, Country' },
        { id: '14', customerId: '14', productId: '14', quantity: 2, status: OrderStatus.PENDING, totalPrice: 220, shippingAddress: '1111 Maple St, City, Country' },
        { id: '15', customerId: '15', productId: '15', quantity: 4, status: OrderStatus.DELIVERED, totalPrice: 360, shippingAddress: '1212 Walnut St, City, Country' },
        { id: '16', customerId: '16', productId: '16', quantity: 1, status: OrderStatus.SHIPPED, totalPrice: 180, shippingAddress: '1313 Ash St, City, Country' },
        { id: '17', customerId: '17', productId: '17', quantity: 2, status: OrderStatus.PENDING, totalPrice: 160, shippingAddress: '1414 Pine St, City, Country' },
        { id: '18', customerId: '18', productId: '18', quantity: 3, status: OrderStatus.DELIVERED, totalPrice: 270, shippingAddress: '1515 Oak St, City, Country' },
        { id: '19', customerId: '19', productId: '19', quantity: 2, status: OrderStatus.SHIPPED, totalPrice: 200, shippingAddress: '1616 Birch St, City, Country' },
        { id: '20', customerId: '20', productId: '20', quantity: 5, status: OrderStatus.PENDING, totalPrice: 500, shippingAddress: '1717 Cedar St, City, Country' }
    ]

    findAll(limit: number, page: number) {
        const offset = Math.abs(page - 1) * limit;
        const orders = this.orders.slice(offset, offset + limit);

        if (!orders.length) {
            return {
                ok: false,
                data: [],
                msg: 'No orders found'
            };
        } else {
            return {
                ok: true,
                msg: 'Orders fetched successfully!',
                data: orders
            };
        }
    }

    findAllByCustomer(customerId: string) {
        const orders = this.orders.filter((order) => order.customerId === customerId);

        if (!orders.length) {
            return {
                ok: false,
                data: [],
                msg: 'No orders found for this customer'
            };
        } else {
            const ordersComplete = orders.map((order) => ({
                ...order,
                productDetail: this.productService.findOne(order.productId).data
            }))

            return {
                ok: true,
                msg: 'Orders fetched successfully!',
                data: ordersComplete
            };
        }
    }

    findOne(id: string) {
        const order = this.orders.find((order) => order.id === id);

        if (!order) {
            return {
                ok: false,
                data: {},
                msg: 'No order found'
            };
        } else {
            order['productDetail'] = this.productService.findOne(order?.productId).data
            return {
                ok: true,
                data: order,
                msg: 'Order fetched successfully!'
            };
        }
    }

    search(query: string) {
        const orders = this.orders.filter((order) =>
            Object.values(order).some((value) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );

        if (!orders.length) {
            return {
                ok: false,
                data: [],
                msg: 'No orders found'
            };
        } else {
            return {
                ok: true,
                msg: 'Orders fetched successfully!',
                data: orders
            };
        }
    }

    create(order: CreateOrderDto) {
        const id: string = uuidv4();

        const newOrder: IOrder = {
            ...order,
            id
        };

        this.orders.push(newOrder);

        return {
            ok: true,
            data: newOrder,
            msg: 'Order created successfully!'
        };
    }

    update(id: string, orderUpdated: UpdateOrderDto) {
        const response = this.findOne(id);
        if (!response.ok) {
            return response;
        } else {
            this.orders = this.orders.map((order) =>
                order.id === id ? { ...order, ...orderUpdated } : order
            );

            return {
                ...response,
                msg: 'Order updated successfully!'
            };
        }
    }

    delete(id: string) {
        const response = this.findOne(id);
        if (!response.ok) {
            return response;
        } else {
            this.orders = this.orders.filter((order) => order.id !== id);

            return {
                ...response,
                msg: 'Order deleted successfully!'
            };
        }
    }

    findByStatus(status: OrderStatus) {
        console.log(status)
        const orders = this.orders.filter((order) => order.status === status);

        if (!orders.length) {
            return {
                ok: false,
                data: [],
                msg: `No orders found with status: ${status}`
            };
        } else {
            return {
                ok: true,
                msg: 'Orders fetched successfully!',
                data: orders
            };
        }
    }

    calculateTotalPrice(orderId: string) {
        const order = this.orders.find((order) => order.id === orderId);
        if (!order) {
            return {
                ok: false,
                msg: 'Order not found'
            };
        } else {
            const totalPrice = order.quantity * order.totalPrice;
            return {
                ok: true,
                msg: 'Total price calculated successfully!',
                totalPrice
            };
        }
    }
}
