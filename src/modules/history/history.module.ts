import { Module } from '@nestjs/common';
import { historyRepositry } from 'src/constants/entityRepositry';
import { History } from './history.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: historyRepositry,
      useValue: History,
    },
  ],
  exports: [],
})
export class HistoryModule {}
