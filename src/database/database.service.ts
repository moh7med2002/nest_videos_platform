import { Admin } from 'src/modules/admin/admin.entity';
import { Category } from 'src/modules/category/category.entity';
import { User } from 'src/modules/user/user.entity';
import { sequelize } from './connection';
import { HistoryStaus } from 'src/modules/hirtoryStatus/historyStatus.entity';
import { Video } from 'src/modules/video/video.entity';
import { History } from 'src/modules/history/history.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.addModels([
        Admin,
        User,
        Category,
        HistoryStaus,
        Video,
        History,
      ]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];
