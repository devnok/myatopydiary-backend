import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import User from './User';
import bcrypt from 'bcrypt';

@Table
export default class Account extends Model {
  // @PrimaryKey
  // @Default(DataType.UUIDV4)
  // @Column(DataType.UUID)
  // @AutoIncrement
  // @Column
  // id!: number;

  @Column
  nickname!: string;

  @Unique
  @IsEmail
  @Column
  email!: string;

  @Column
  password!: string;

  @HasMany(() => User)
  users!: User[];

  comparePassword(candidatePassword: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
  }
}
