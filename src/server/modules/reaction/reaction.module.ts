import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Reaction } from './reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
