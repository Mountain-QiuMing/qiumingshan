import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@/core/guard/jtw.guard';

@ApiTags('文件')
@Controller('api/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseGuards(new JwtAuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body('type') type: string) {
    return await this.fileService.upload(file, type);
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const fileEntity = await this.fileService.getFile(fileName);
    // 设置响应内容类型
    res.set({ 'Content-Type': fileEntity.mimeType });

    createReadStream(join(process.cwd(), fileEntity.path)).pipe(res);
  }
}
