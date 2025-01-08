import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: environments[process.env.NODE_ENV],
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                API_KEY: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_CONECCTION: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
            })
        }),
        UsersModule,
        ProductsModule,
        HttpModule,
        DatabaseModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'TASKS',
            useFactory: async (http: HttpService) => {
                try {
                    const { data: tasks } = await firstValueFrom(http.get<Tasks, Error>('https://jsonplaceholder.typicode.com/todos'))

                    return tasks
                } catch (error) {
                    console.log(error)
                }
            },
            inject: [HttpService]
        }
    ],
})

export class AppModule { }

export type Task = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type Tasks = Task[]
