import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { PostModule } from '../post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PostModule],
  providers: [EventsGateway, EventsService],
  exports: [EventsGateway],
})
export class EventsModule {}
