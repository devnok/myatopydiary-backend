import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  IsDate,
  Model,
  Table,
} from 'sequelize-typescript';

import ReportDetail from './ReportDetail';
import Sequelize from 'sequelize';
import User from './User';

@Table
export default class Report extends Model {
  @IsDate
  @Default(Sequelize.NOW)
  @Column
  reportAt!: Date;

  @Column
  etScore!: number;

  @Column
  opScore!: number;

  @Column
  ecScore!: number;

  @Column
  lfScore!: number;

  @HasOne(() => ReportDetail)
  reportDetail!: ReportDetail;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
