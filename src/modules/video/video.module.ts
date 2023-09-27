import { Module } from '@nestjs/common';
import { videoRepositry } from 'src/constants/entityRepositry';
import { Video } from './video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [VideoController],
  providers: [
    {
      provide: videoRepositry,
      useValue: Video,
    },
    VideoService,
  ],
  imports: [CategoryModule, UserModule],
  exports: [],
})
export class VideoModule {}
