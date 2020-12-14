import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';

import Report from './Report';
import Sequelize from 'sequelize';

@Table
export default class ReportDetail extends Model {
  @Min(0)
  @Column
  itchScore!: number;

  @AllowNull
  @Column
  exacerbation!: string;

  @Column
  content!: string;

  @ForeignKey(() => Report)
  @Column
  reportId!: number;

  @BelongsTo(() => Report)
  report!: Report;
}
