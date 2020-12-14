import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class BaseMedicine extends Model {
  @Column
  title!: string;
}
