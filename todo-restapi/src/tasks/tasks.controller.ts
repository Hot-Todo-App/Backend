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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { TaskDto } from '../dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get('/')
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
  @Get('/getAllCompletedTasks')
  findCompleted(): Promise<Task[]> {
    return this.taskService.findCompleted();
  }
  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Post('/createTask')
  addTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.create(taskDto);
  }
  @Delete('/delete/:id')
  @ApiParam({ name: 'id' })
  destroy(@Param('id') id: string): Promise<void> {
    return this.taskService.destroy(id);
  }

  @Put('/editTaskStatus/:id')
  @ApiParam({ name: 'id' })
  updateStatus(@Param('id') id: string): Promise<Task> {
    return this.taskService.updateTaskStatus(id);
  }

  @Put('/editTitle/:id/:title')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'title' })
  updateTitle(
    @Param('id') id: string,
    @Param('title') title: string,
  ): Promise<Task> {
    return this.taskService.updateTitle(id, title);
  }
}
