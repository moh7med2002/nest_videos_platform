import { Module } from '@nestjs/common';
import { videoRepositry } from 'src/constants/entityRepositry';
import { Video } from './video.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: videoRepositry,
      useValue: Video,
    },
  ],
  exports: [],
})
export class VideoModule {}
