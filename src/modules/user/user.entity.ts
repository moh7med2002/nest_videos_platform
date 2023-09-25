import {
  Column,
  Table,
  Model,
  DataType,
  Scopes,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { HistoryStaus } from '../hirtoryStatus/historyStatus.entity';
import { History } from '../history/history.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
  withoutPassword: {
    attributes: { exclude: ['password', 'updatedAt', 'createdAt'] },
  },
}))
export class User extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  image: string;

  @HasOne(() => HistoryStaus)
  historyStatus: HistoryStaus;

  @HasMany(() => History)
  histories: History[];
}
