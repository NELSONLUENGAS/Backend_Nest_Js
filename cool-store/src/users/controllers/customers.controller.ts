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
    CreateCustomerDto,
    FilterCustomerDto,
    SearchCustomerDto,
    UpdateCustomerDto
} from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
import {
    ApiCreateCustomerDocumentation,
    ApiDeleteCustomerDocumentation,
    ApiFindAllCustomersDocumentation,
    ApiFindOneCustomerDocumentation,
    ApiSearchCustomersDocumentation,
    ApiUpdateCustomerDocumentation
} from '../api/decorators/customers';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { RolesAccess } from '@auth/decorators/roles.decorator';
import { UserRole } from '@users/interfaces/user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(ROUTES.CUSTOMERS.BASE)
export class CustomersController {

    constructor(private customerService: CustomersService) { }

    @Post(ROUTES.CUSTOMERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @RolesAccess(UserRole.ADMIN)
    @ApiCreateCustomerDocumentation()
    create(@Body() customer: CreateCustomerDto) {
        return this.customerService.create(customer)
    }

    @Get(ROUTES.CUSTOMERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindAllCustomersDocumentation()
    findAll(@Query() queryString: FilterCustomerDto) {
        const { limit = 15, page = 1 } = queryString
        return this.customerService.findAll(limit, page)
    }

    @Get(ROUTES.CUSTOMERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiSearchCustomersDocumentation()
    search(@Query() queryString: SearchCustomerDto) {
        const { s: search = '' } = queryString
        return this.customerService.search(search)
    }

    @Get(ROUTES.CUSTOMERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindOneCustomerDocumentation()
    findOne(@Param('id', MongoIdPipe) customerId: string) {
        return this.customerService.findOne(customerId)
    }

    @Put(ROUTES.CUSTOMERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiUpdateCustomerDocumentation()
    update(@Param('id', MongoIdPipe) customerId: string, @Body() customer: UpdateCustomerDto) {
        return this.customerService.update(customerId, customer)
    }

    @Delete(ROUTES.CUSTOMERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiDeleteCustomerDocumentation()
    delete(@Param('id', MongoIdPipe) customerId: string) {
        return this.customerService.delete(customerId)
    }
}
