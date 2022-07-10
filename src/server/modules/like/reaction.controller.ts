import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { JwtAuthGuard } from '../../core/guard/jtw.guard';

@Controller('api/reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async store(@Body() reaction: CreateReactionDto) {
    return await this.reactionService.store(reaction);
  }
}
