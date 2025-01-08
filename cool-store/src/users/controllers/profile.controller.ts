import { RolesAccess } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { IJwtTokenPayload } from '@auth/interfaces/jwt.interface';
import { ROUTES } from '@constants/routes';
import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiProfileFindAllOrdersDocumentation } from '@users/api/decorators/profile';
import { UserRole } from '@users/interfaces/user.interface';
import { OrdersService } from '@users/services/orders.service';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(ROUTES.PROFILE.BASE)
export class ProfileController {
    constructor(private orderService: OrdersService) { }

    @Get(ROUTES.PROFILE.ORDERS)
    @RolesAccess(UserRole.CUSTOMER)
    @HttpCode(HttpStatus.OK)
    @ApiProfileFindAllOrdersDocumentation()
    findAllOrders(@Req() req: Request) {
        const { sub: customerId } = req.user as IJwtTokenPayload
        return this.orderService.findByCustomer(customerId)
    }
}
