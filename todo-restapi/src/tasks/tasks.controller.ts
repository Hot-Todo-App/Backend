/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { ApiTags, ApiParam, ApiBody, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { TaskDto } from '../dto/task.dto';
import { DATE_FIELDS } from 'src/types/dateFields.types';
import { TASKS_STATUS } from 'src/types/tasksStatus.types';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) { }
  
  @Get("/")
  @ApiQuery({ name: 'status', required: false, enum: Object.values(TASKS_STATUS) })
  @ApiQuery({ name: 'dateField', required: false, enum: DATE_FIELDS })
  @ApiQuery({ name: 'startDate', required: false, example: new Date() })
  @ApiQuery({ name: 'endDate', required: false,example: new Date() })
  findCompleted(
    @Query('status') status?: TASKS_STATUS,
    @Query('dateField') dateField?: DATE_FIELDS,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string): Promise<Task[]> {
    return this.taskService.findTasksBy(status,dateField,startDate,endDate);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }


  @ApiBody({ type: TaskDto })
  @Post('/')
  addTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.create(taskDto);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  destroy(@Param('id') id: string): Promise<void> {
    return this.taskService.destroy(id);
  }

  @Put('/status/:id')
  @ApiParam({ name: 'id' })
  updateStatus(@Param('id') id: string): Promise<Task> {
    return this.taskService.updateTaskStatus(id);
  }

  @Put('/title/:id/:title')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'title' })
  updateTitle(
    @Param('id') id: string,
    @Param('title') title: string,
  ): Promise<Task> {
    return this.taskService.updateTitle(id, title);
  }
}
