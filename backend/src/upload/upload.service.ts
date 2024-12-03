import { PrismaService } from 'src/prisma/prisma.service';
import {
  UploadedFile,
  BadRequestException,
  Body,
  Injectable,
} from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as mime from 'mime-types';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async processFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
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
    const validSecondDigit = ['5', '6', '7', '8'];

    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = rows[0];
    console.log(headers);
    let isHeaderEmpty = false;
    for (let index = 0; index < (headers as string[]).length; index++) {
      if (headers[index] === undefined || headers[index] === '') {
        isHeaderEmpty = true;
        break;
      }
    }

    if (isHeaderEmpty) {
      await this.prisma.history.create({
        data: {
          FileName: file.originalname,
          ValidFile: null,
          InvalidFile: null,
        },
      });

      console.log(
        'Header row contains empty values, stored in Prisma with null data.',
      );
      return false;
    }
    const dataRows = rows.slice(1);

    const invalidData: any[] = [];
    const validData: any[] = [];

    const jsonData = dataRows.filter((row: any, index: number) => {
      const processRow = row.filter(
        (elm: any) => elm !== undefined && elm !== '',
      );

      if (processRow.length !== row.length) {
        invalidData.push({
          ...row.reduce((acc: any, value: any, idx: number) => {
            acc[headers[idx] || `column_${idx + 1}`] =
              value === undefined || value === '' ? 'empty' : value;
            return acc;
          }, {}),
          reason: 'Empty column',
        });
        return false;
      }

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
          ...row.reduce((acc: any, value: any, idx: number) => {
            acc[headers[idx] || `column_${idx + 1}`] = value;
            return acc;
          }, {}),
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
      row[selectedRows.amount - 1] = Math.floor(row[selectedRows.amount - 1]);

      validData.push({
        ...row.reduce((acc: any, value: any, idx: number) => {
          acc[headers[idx]] = value;
          return acc;
        }, {}),
      });

      return true;
    });

    await this.prisma.history.create({
      data: {
        FileName: file.originalname,
        ValidFile: validData.length > 0 ? validData : null,
        InvalidFile: invalidData.length > 0 ? invalidData : null,
      },
    });

    return { jsonData, invalidData };
  }
}
