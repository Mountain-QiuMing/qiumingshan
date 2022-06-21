import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ServerModule } from './server.module';
import { TransformInterceptor } from './core/intercepter/transform.intercepter';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { AllExceptionsFilter } from './core/exception/all.exception';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  const docConfig = new DocumentBuilder()
    .setTitle('秋名山')
    .setDescription('秋名山 接口文档')
    .setVersion('1.0')
    .addTag('秋名山')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  const appConfig = app.get(ConfigService);
  const port = appConfig.get('APP_PORT');

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
