import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        ProductsModule
    ],
    controllers: [
        OrdersController,
        UsersController,
        CustomersController
    ],
    providers: [
        CustomersService,
        UsersService,
        OrdersService
    ],
    exports: [
        CustomersService,
        UsersService,
        OrdersService
    ]
})
export class UsersModule { }
