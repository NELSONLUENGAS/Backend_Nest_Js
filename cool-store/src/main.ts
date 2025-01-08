import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))

    const config = new DocumentBuilder()
        .setTitle('COOL STORE API')
        .setDescription('Here is the Coolstore API documentation 😃')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',

            },
            'access-token',
        )
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('documentation', app, documentFactory, {
        jsonDocumentUrl: 'documentation/json',
    });

    app.enableCors({
        origin: '*',
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE']
    })
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
