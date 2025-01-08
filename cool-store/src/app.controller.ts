import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { PublicAccess } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @PublicAccess()
    getHello(): string {
        return this.appService.getHello();
    }
}
