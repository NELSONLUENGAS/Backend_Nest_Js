import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from './app.module';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
    constructor(
        @Inject('TASKS') private tasks: Tasks,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) { }

    getHello(): string {
        const apiKey = this.configService.apiKey
        return 'Hello World!😀' + apiKey;

    }

    getTasks() {
        // const tasksCollection = this.DB.collection('tasks')
        // return tasksCollection.find().toArray()
    }

}

