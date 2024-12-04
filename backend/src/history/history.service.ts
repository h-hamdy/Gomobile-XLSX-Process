import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistoryList() {
	return await this.prisma.history.findMany({
	  orderBy: {
		createdAt: 'desc',
	  },
	  take: 20,
	});
  }

  async getValidItemById(id: number | string) {
	const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  
	if (isNaN(numericId)) {
	  throw new Error('Invalid ID format: must be a number.');
	}
  
	const historyItem = await this.prisma.history.findUnique({
	  where: { id: numericId },
	  select: { ValidFile: true },
	});
  
	if (!historyItem) {
	  throw new Error('History item not found.');
	}
  
	return historyItem.ValidFile;
  }

  async getInValidItemById(id: number | string) {
	const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  
	if (isNaN(numericId)) {
	  throw new Error('Invalid ID format: must be a number.');
	}
  
	const historyItem = await this.prisma.history.findUnique({
	  where: { id: numericId },
	  select: { InvalidFile: true },
	});
  
	if (!historyItem) {
	  throw new Error('History item not found.');
	}
  
	return historyItem.InvalidFile;
  }

  async searchByFileName(FileName: string) {
    return await this.prisma.history.findMany({
      where: {
        FileName: {
          contains: FileName,
        //   insensitive: true,
        },
      },
    });
  }
  
}
