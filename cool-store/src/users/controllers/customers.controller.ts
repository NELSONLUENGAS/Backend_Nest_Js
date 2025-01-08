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
    Query
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

@Controller(ROUTES.CUSTOMERS.BASE)
export class CustomersController {

    constructor(private customerService: CustomersService) { }

    @Post(ROUTES.CUSTOMERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateCustomerDocumentation()
    create(@Body() customer: CreateCustomerDto) {
        return this.customerService.create(customer)
    }

    @Get(ROUTES.CUSTOMERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiFindAllCustomersDocumentation()
    findAll(@Query() queryString: FilterCustomerDto) {
        const { limit = 15, page = 1 } = queryString
        return this.customerService.findAll(limit, page)
    }

    @Get(ROUTES.CUSTOMERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    @ApiSearchCustomersDocumentation()
    search(@Query() queryString: SearchCustomerDto) {
        const { s: search = '' } = queryString
        return this.customerService.search(search)
    }

    @Get(ROUTES.CUSTOMERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiFindOneCustomerDocumentation()
    findOne(@Param('id', MongoIdPipe) customerId: string) {
        return this.customerService.findOne(customerId)
    }

    @Put(ROUTES.CUSTOMERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiUpdateCustomerDocumentation()
    update(@Param('id', MongoIdPipe) customerId: string, @Body() customer: UpdateCustomerDto) {
        return this.customerService.update(customerId, customer)
    }

    @Delete(ROUTES.CUSTOMERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiDeleteCustomerDocumentation()
    delete(@Param('id', MongoIdPipe) customerId: string) {
        return this.customerService.delete(customerId)
    }
}
