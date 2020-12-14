import BaseMedicine from './BaseMedicine';
import { Table } from 'sequelize-typescript';

@Table
export default class Pill extends BaseMedicine {}
