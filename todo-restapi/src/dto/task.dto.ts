import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ example: '50749d0c-bf4b-4669-8771-1d8805838d22' })
  id: string;

  @ApiProperty({ example: 'Task Title' })
  title: string;

  @ApiProperty({ example: false })
  status: boolean;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}