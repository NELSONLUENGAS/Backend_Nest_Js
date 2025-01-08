import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import { ROUTES } from '../../constants/routes';
import {
    CreateOrderDto,
    FilterOrderDto,
    UpdateOrderDto
} from '../dtos/orders.dto';
import { OrderStatus } from '../interfaces/order.interface';
import { OrdersService } from '../services/orders.service';
import {
    ApiCreateOrderDocumentation,
    ApiDeleteOrderDocumentation,
    ApiFindAllOrdersDocumentation,
    ApiFindOneOrderDocumentation,
    ApiFindOrdersByCustomerDocumentation,
    ApiFindOrdersByProductDocumentation,
    ApiFindOrdersByStatusDocumentation,
    ApiGetTotalPriceDocumentation,
    ApiUpdateOrderDocumentation
} from '../api/decorators/orders';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { RolesAccess } from '@auth/decorators/roles.decorator';
import { UserRole } from '@users/interfaces/user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(ROUTES.ORDERS.BASE)
export class OrdersController {
    constructor(private orderService: OrdersService) { }

    @Post(ROUTES.ORDERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @RolesAccess(UserRole.ADMIN, UserRole.CUSTOMER)
    @ApiCreateOrderDocumentation()
    create(@Body() order: CreateOrderDto) {
        return this.orderService.create(order)
    }

    @Get(ROUTES.ORDERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindAllOrdersDocumentation()
    findAll(@Query() queryString: FilterOrderDto) {
        const { limit = 15, page = 1 } = queryString
        return this.orderService.findAll(limit, page)
    }

    @Get(ROUTES.ORDERS.GET_BY_STATUS)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindOrdersByStatusDocumentation()
    findByStatus(@Param('status') status: OrderStatus) {
        return this.orderService.findByStatus(status)
    }

    @Get(ROUTES.ORDERS.GET_BY_CUSTOMER)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindOrdersByCustomerDocumentation()
    findByCustomer(@Param('id', MongoIdPipe) customerId: string) {
        return this.orderService.findByCustomer(customerId)
    }

    @Get(ROUTES.ORDERS.GET_BY_PRODUCT)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindOrdersByProductDocumentation()
    findByProduct(@Param('id', MongoIdPipe) productId: string) {
        return this.orderService.findByProduct(productId)
    }

    @Get(ROUTES.ORDERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindOneOrderDocumentation()
    findOne(@Param('id', MongoIdPipe) orderId: string) {
        return this.orderService.findOne(orderId)
    }

    @Put(ROUTES.ORDERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiUpdateOrderDocumentation()
    update(@Param('id', MongoIdPipe) orderId: string, @Body() order: UpdateOrderDto) {
        return this.orderService.update(orderId, order)
    }

    @Delete(ROUTES.ORDERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiDeleteOrderDocumentation()
    delete(@Param('id', MongoIdPipe) orderId: string) {
        return this.orderService.delete(orderId)
    }

    @Get(ROUTES.ORDERS.GET_TOTAL_PRICE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiGetTotalPriceDocumentation()
    getTotal(@Param('id', MongoIdPipe) orderId: string) {
        return this.orderService.getTotalPrice(orderId)
    }
}
