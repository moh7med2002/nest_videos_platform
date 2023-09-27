import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { videoRepositry } from 'src/constants/entityRepositry';
import { Video } from './video.entity';
import { CategoryService } from '../category/category.service';
import { VideoDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class VideoService {
  constructor(
    @Inject(videoRepositry)
    private videoModel: typeof Video,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  async createVideo(dto: VideoDto, image: string) {
    await this.categoryService.categoryById(dto.categoryId);
    await this.videoModel.create({
      title: dto.title,
      categoryId: dto.categoryId,
      image,
      url: dto.url,
    });
    return { message: 'video has been created' };
  }

  async fetchAllVideos() {
    const videos = await this.videoModel.findAll();
    return { videos };
  }

  async singleVideo(videoId: string, userId: number) {
    const videoPromise = this.videoaById(videoId);
    const userPromise = this.userService.userById(userId);
    const [user, video] = await Promise.all([userPromise, videoPromise]);
  }

  async videoaById(id) {
    const video = await this.videoModel.findByPk(id);
    if (!video) {
      throw new BadRequestException('video not found');
    }
    return video;
  }
}
