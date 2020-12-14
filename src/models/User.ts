import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  IsDate,
  IsIn,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Account from './Account';
import AtopyDetail from './AtopyDetail';
import Report from './Report';

@Table
export default class User extends Model {
  // @PrimaryKey
  // @Default(DataType.UUIDV4)
  // @Column(DataType.UUID)
  // @AutoIncrement
  // @Column
  // id!: number;

  @Column
  name!: string;

  @IsDate
  @Column(DataType.DATEONLY)
  birthday!: Date;

  @IsIn([['male', 'female']])
  @Column
  gender!: string;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @HasOne(() => AtopyDetail)
  atopyDetail!: AtopyDetail;

  @HasMany(() => Report)
  reports!: Report[];
}
