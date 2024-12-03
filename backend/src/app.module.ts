import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [PrismaModule, UploadModule, HistoryModule],
})
export class AppModule {}
