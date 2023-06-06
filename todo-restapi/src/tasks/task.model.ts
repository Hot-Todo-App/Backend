/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TASKS_STATUS } from '../types/tasksStatus.types';
@Table({ tableName: 'Tasks' })
export class Task extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  @ApiProperty({ example: 1 })
  id: string;

  @Column(DataType.STRING)
  @ApiProperty({ example: 'To do the laundry' })
  title: string;

  @Column(DataType.STRING)
  @ApiProperty({ example: false })
  status: TASKS_STATUS;

  @CreatedAt
  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @UpdatedAt
  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}
