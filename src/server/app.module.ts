import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './modules/post/post.controller';
import { PostModule } from './modules/post/post.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { join } from 'path';
import { PostEntity } from './modules/post/post.entity';
import { UserEntity } from './modules/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'web_c',
      entities: [PostEntity, UserEntity],
      autoLoadEntities: true,
      // migrations: ['src/**/*.ts'],
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
    }),
    PostModule,
    UserModule,
  ],
  controllers: [AppController, PostController, UserController],
  providers: [AppService],
})
export class AppModule {}
