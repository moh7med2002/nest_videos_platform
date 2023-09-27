import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { VideoService } from './video.service';
import { VideoDto } from './dto';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post('/create')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  adminSignup(
    @Body() dto: VideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('upload image is required');
    }
    return this.videoService.createVideo(dto, file.filename);
  }

  @Get('all')
  getVideos() {
    return this.videoService.fetchAllVideos();
  }
}
