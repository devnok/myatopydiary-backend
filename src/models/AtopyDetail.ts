import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsDate,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';

import User from './User';

@Table
export default class AtopyDetail extends Model {
  @Min(1900)
  @Column
  startYear!: number;

  @Column
  comorbidity!: string;

  @Column
  visitingHospital!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
