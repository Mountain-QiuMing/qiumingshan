import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ServerModule } from './server.module';
import { TransformInterceptor } from './core/intercepter/transform.intercepter';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { AllExceptionsFilter } from './core/exception/all.exception';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  const config = new DocumentBuilder()
    .setTitle('秋名山')
    .setDescription('秋名山 接口文档')
    .setVersion('1.0')
    .addTag('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3002);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
