import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('')
export class UploadController {

	constructor (private readonly UploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.UploadService.processFile(file, body);
  }
}
