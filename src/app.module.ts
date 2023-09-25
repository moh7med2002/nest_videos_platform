import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './common/util/custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './geteway/geteway.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { HistoryStausModule } from './modules/hirtoryStatus/historyStatus.module';
import { VideoModule } from './modules/video/video.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    DatabaseModule,
    GatewayModule,
    AdminModule,
    UserModule,
    CategoryModule,
    HistoryStausModule,
    VideoModule,
    HistoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
