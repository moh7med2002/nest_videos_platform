import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { HistoryStatusEnum } from 'src/constants/enums';
import { User } from '../user/user.entity';

@Table
export class HistoryStaus extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM(HistoryStatusEnum.notPause, HistoryStatusEnum.pause),
    defaultValue: HistoryStatusEnum.notPause,
  })
  status: HistoryStatusEnum;
}
