import { Module } from '@nestjs/common';
import { userRepositry } from 'src/constants/entityRepositry';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: userRepositry,
      useValue: User,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
