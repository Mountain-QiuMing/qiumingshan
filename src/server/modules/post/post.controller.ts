import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  public index() {
    return { posts: this.service.all() };
  }

  @Get(':id')
  public get(@Param('id') slug: string) {
    const post = this.service.find(slug);

    if (post === null) {
      throw new NotFoundException();
    }

    return { post };
  }
}
