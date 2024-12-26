import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from './app.module';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
    constructor(@Inject('TASKS') private tasks: Tasks, @Inject(config.KEY) private configService: ConfigType<typeof config>) { }
    getHello(): string {
        const apiKey = this.configService.apiKey
        console.log(this.tasks)
        return 'Hello World!😀' + apiKey;
    }
}
