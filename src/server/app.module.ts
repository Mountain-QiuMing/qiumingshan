import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './modules/post/post.controller';
import { PostModule } from './modules/post/post.module';
import { PostService } from './modules/post/post.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
