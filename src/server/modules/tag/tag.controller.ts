import { Controller, Post, Body, Put, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('recommand')
  async findRecommendList() {
    return this.tagService.findRecommendList();
  }

  @Get('name/:name')
  async index(@Param('name') name: string) {
    return this.tagService.index(name);
  }

  @Post()
  @UseGuards(AuthGuard())
  async store(@Body() tag: CreateTagDto) {
    return this.tagService.store(tag);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() tag: Partial<CreateTagDto>) {
    return await this.tagService.update(id, tag);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
