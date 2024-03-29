import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { History } from '../history/history.entity';

@Table
export class Video extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  views: number;

  @ForeignKey(() => Category)
  @Column({})
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => History)
  histories: History[];
}
