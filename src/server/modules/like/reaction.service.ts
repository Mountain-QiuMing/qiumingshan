import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './reaction.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly ReactionRepository: Repository<Reaction>,
  ) {}

  async store(reaction: CreateReactionDto) {
    return await this.ReactionRepository.save(reaction);
  }
}
