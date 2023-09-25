import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { Video } from '../video/video.entity';

@Table
export class History extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Video)
  @Column({})
  videoId: number;

  @BelongsTo(() => Video)
  video: Video;
}
