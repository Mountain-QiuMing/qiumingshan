import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { FileService } from './file.service';

@ApiTags('文件')
@Controller('api/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const fileEntity = await this.fileService.getFile(fileName);
    // 设置响应内容类型
    res.set({ 'Content-Type': fileEntity.mimeType });

    createReadStream(join(process.cwd(), fileEntity.path)).pipe(res);
  }
}
