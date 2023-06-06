import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {Exclude} from 'class-transformer';
import { TASKS_STATUS } from 'src/types/tasksStatus.types';
export class TaskDto {
  @Exclude()
  id: string;

  @ApiProperty({ example: 'Task Title' })
  title: string;

  @ApiProperty({
    enum: Object.values(TASKS_STATUS),
    enumName: 'TaskStatus',
    example: TASKS_STATUS.CREATED,
  })
  status: TASKS_STATUS;

  @Exclude()
  createdAt: Date;

  @Exclude()  
  updatedAt: Date;
}