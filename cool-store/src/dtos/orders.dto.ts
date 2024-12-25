import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { OrderStatus } from 'src/interfaces/order.interface';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    readonly customerId: string;

    @IsString()
    @IsNotEmpty()
    readonly productId: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly quantity: number;

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    readonly status: OrderStatus;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly totalPrice: number;

    @IsString()
    @IsNotEmpty()
    readonly shippingAddress: string;
}

export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    @IsOptional()
    readonly status?: OrderStatus;

    @IsString()
    @IsOptional()
    readonly shippingAddress?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    readonly totalPrice?: number;
}
