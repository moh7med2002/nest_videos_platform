import { Module } from '@nestjs/common';
import { historyStatusRepositry } from 'src/constants/entityRepositry';
import { HistoryStaus } from './historyStatus.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: historyStatusRepositry,
      useValue: HistoryStaus,
    },
  ],
  exports: [],
})
export class HistoryStausModule {}
