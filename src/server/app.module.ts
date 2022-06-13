import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { PostEntity } from './modules/post/post.entity';
import { UserEntity } from './modules/user/user.entity';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.101.33.221',
      port: 3306,
      username: 'admin',
      password: 'Admin1230.',
      database: 'web_c',
      entities: [PostEntity, UserEntity],
      autoLoadEntities: true,
      // migrations: ['src/**/*.ts'],
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
    }),
    PostModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
