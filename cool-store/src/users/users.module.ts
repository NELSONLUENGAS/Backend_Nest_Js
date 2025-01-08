import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModel, CustomerSchema } from './models/customer.model';
import { OrderModel, OrderSchema } from './models/order.model';
import { UserModel, UserSchema } from './models/user.model';
import { OrderItemModel, OrderItemSchema } from './models/orderItem.model';
import { ProfileController } from './controllers/profile.controller';

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forFeature([
            {
                name: CustomerModel.name,
                schema: CustomerSchema
            },
            {
                name: OrderModel.name,
                schema: OrderSchema
            },
            {
                name: OrderItemModel.name,
                schema: OrderItemSchema
            },
            {
                name: UserModel.name,
                schema: UserSchema
            },
        ])
    ],
    controllers: [
        OrdersController,
        UsersController,
        CustomersController,
        ProfileController
    ],
    providers: [
        CustomersService,
        UsersService,
        OrdersService,
    ],
    exports: [
        CustomersService,
        UsersService,
        OrdersService
    ]
})
export class UsersModule { }
