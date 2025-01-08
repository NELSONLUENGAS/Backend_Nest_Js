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
                if (CONECCTION === 'mongodb+srv') {
                    return {
                        uri: `${CONECCTION}://${USER}:${PASSWORD}@${HOST}/${NAME}?retryWrites=true&w=majority`
                    }
                }
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
