import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';




@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                const { CONECCTION, USER, PASSWORD, PORT, HOST, NAME } = configService.MONGO

                return {
                    uri: `${CONECCTION}://${HOST}${PORT ? `:${PORT}` : ''}`,
                    pass: USER,
                    user: PASSWORD,
                    dbName: NAME
                }
            },
            inject: [config.KEY]
        })
    ],
    providers: [],
    exports: [MongooseModule]
})
export class DatabaseModule { }
