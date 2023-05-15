/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class Task extends Model {
  @Column
  @ApiProperty()
  title: string;
  @Column
  @ApiProperty()
  date: string;
  @Column
  @ApiProperty()
  status: boolean;
}
