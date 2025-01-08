import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { OrderStatus } from '../interfaces/order.interface';

export class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    readonly productId: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly quantity: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly price: number;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    readonly customerId: string;

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    readonly status: OrderStatus;

    @IsString()
    @IsNotEmpty()
    readonly shippingAddress: string;

    @IsArray()
    @IsNotEmpty()
    readonly orderItems: CreateOrderItemDto[];
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

export class FilterOrderDto {

    @ApiProperty({
        description: 'The number to limit the query',
        example: 15,
        required: false,
        minimum: 1,
        default: 15,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => Number(value))
    limit: number;

    @ApiProperty({
        description: 'The number of page',
        example: 1,
        required: false,
        minimum: 1,
        default: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page: number;
}

export class SearchOrderDto {
    @ApiProperty({
        description: 'Search term to filter products by name, category or description',
        example: 'Pepito',
        required: false,
        default: '',
    })
    @IsOptional()
    @IsString()
    s: string
}
