import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ServerModule } from './server.module';
import { TransformInterceptor } from './core/intercepter/transform.intercepter';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { AllExceptionsFilter } from './core/exception/all.exception';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  const appConfig = app.get(ConfigService);
  const appName = appConfig.get('APP_NAME');
  const port = appConfig.get('APP_PORT');
  const multerDest = appConfig.get('MULTER_DEST');
  const publicFilePath = appConfig.get('PUBLIC_FILE_PATH');

  app.use(publicFilePath, express.static(multerDest));
  app.use(cookieParser());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Credentials', 'true'); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-control-max-age', '1000'); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  const docConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${appName} 接口文档`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
