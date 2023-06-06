import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {Exclude} from 'class-transformer';
export class TaskDto {
    @Exclude()
  id: string;

  @ApiProperty({ example: 'Task Title' })
  title: string;

  @ApiProperty({ example: false })
  status: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()  
  updatedAt: Date;
}