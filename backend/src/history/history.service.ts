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
  
}
