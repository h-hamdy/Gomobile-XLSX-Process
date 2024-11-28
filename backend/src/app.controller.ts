import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import * as mime from 'mime-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const selectedRows = body.selectedRows ? JSON.parse(body.selectedRows) : [];
    console.log('Selected Rows:', selectedRows);
    const mimeType = mime.lookup(file.originalname);
    if (
      mimeType !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException(
        'Invalid file type. Only .xlsx files are allowed.',
      );
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];
    const seenNumber = new Set();
    const invalidData = [];
    const validSecondDigit = ['5', '6', '7', '8'];

    const jsonData = XLSX.utils
      .sheet_to_json(sheet, { header: 1 })
      .filter((row, index) => {

		if (index === 0) return true;
        let phoneNumber = String(row[selectedRows.telephone - 1])
          .replace(/[^\d]/g, '')
          .replace(/^212/, '0');

        if (phoneNumber[0] !== '0') phoneNumber = '0' + phoneNumber;

        const isInvalid =
          seenNumber.has(phoneNumber) ||
          !validSecondDigit.includes(phoneNumber[1]) ||
          phoneNumber.length !== 10;

        if (isInvalid) {
          invalidData.push({
            phoneNumber: row[selectedRows.telephone - 1],
            id: row[selectedRows.agent - 1],
            balance: row[selectedRows.amount - 1],
            reason: seenNumber.has(phoneNumber)
              ? 'Duplicate'
              : phoneNumber.length !== 10
                ? 'Invalid length'
                : 'Invalid second digit',
          });
          return false;
        }
        seenNumber.add(phoneNumber);
        row[selectedRows.telephone - 1] = phoneNumber;
        row[selectedRows.amount - 1] = Math.floor(
        row[selectedRows.amount - 1],
        );
        return true;
      });

    return { jsonData, invalidData };
  }
}
