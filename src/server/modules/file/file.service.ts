import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ApiException } from 'src/server/core/exception/api.exception';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>) {}

  /**
   * 上传文件
   * @param {Express.Multer.File} fileData 文件信息
   * @param {string} type 文件类别
   * @return {Promise<Result>} result
   */
  async upload(fileData: Express.Multer.File, type: string = ''): Promise<FileEntity> {
    let file: FileEntity;

    try {
      const fileName = fileData.filename.split('.');
      let fileLike: DeepPartial<FileEntity> = {
        ...fileData,
        type,
        fieldName: fileData.fieldname,
        fileName: fileData.filename,
        fileType: fileName[1],
        mimeType: fileData.mimetype,
        originalName: fileData.originalname,
      };

      file = await this.fileRepository.save<FileEntity>(this.fileRepository.create(fileLike));
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') throw new ApiException('文件已存在', HttpStatus.CONFLICT);
      throw new ApiException('发生了一些错误', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return file;
  }

  /**
   * 获取文件实体
   * @param {string} fileName
   * @returns {Promise<FileEntity>} file
   */
  async getFile(fileName: string): Promise<FileEntity> {
    const file = await this.fileRepository.findOneBy({ fileName });
    if (!file)
      throw new ApiException(`'${fileName}' 文件不存在`, 404);

    return file;
  }
}
