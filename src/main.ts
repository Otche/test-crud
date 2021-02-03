import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
/*import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
  routes: {
    updateOneBase: {
      allowParamsOverride: true,
    },
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});*/

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.url;
    const method = request.method;

    console.log('exception ==> ', Object.keys(exception));
    console.log('code ==> ', exception.code);
    console.log('code ==> ', exception.message);

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR as number)
      .json({ cc: 'cc' });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('crud')
    .setDescription('Crud API description')
    .setVersion('0.1')
    .addTag('crud')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
