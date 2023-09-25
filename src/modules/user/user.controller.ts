import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { UserSignupDto, UserLoginDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  adminSignup(
    @Body() dto: UserSignupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('upload image is required');
    }
    return this.userService.register(dto, file);
  }

  @Post('/login')
  adminLogin(@Body() dto: UserLoginDto) {
    return this.userService.login(dto);
  }
}
