import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { FileModule } from './modules/file/file.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagModule } from './modules/tag/tag.module';
import { EventsModule } from './modules/events/events.module';
import { ReactionModule } from './modules/reaction/reaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOSTS'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          entities: ['dist/server/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          // migrations: ['src/**/*.ts'],
          synchronize: true,
          charset: 'utf8mb4_unicode_ci',
        };
      },
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('EMAIL_SMTP_HOST'),
            port: configService.get('EMAIL_SMTP_PORT'),
            secure: configService.get('EMAIL_SMTP_SECURE'),
            auth: {
              user: configService.get('EMAIL_SMTP_USER'),
              pass: configService.get('EMAIL_SMTP_PASSWORD'),
            },
          },
          defaults: {
            from: `"${configService.get('APP_NAME')}" <${configService.get('EMAIL_SMTP_USER')}>`,
          },
          template: {
            dir: path.join(__dirname, './templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),

    FileModule,
    PostModule,
    UserModule,
    AuthModule,
    TagModule,
    EventsModule,
    ReactionModule,
  ],
})
export class AppModule {}
