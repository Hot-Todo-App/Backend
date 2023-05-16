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

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('/getAllTasks')
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
  addTask(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }
  @Delete('/delete/:id')
  @ApiParam({ name: 'id' })
  destroy(@Param('id') id: string): Promise<void> {
    return this.taskService.destroy(id);
  }
  @Put('/editTitle/:id/:title')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'title' })
  update(
    @Param('id') id: string,
    @Param('title') title: string,
  ): Promise<Task> {
    return this.taskService.updateTitle(id, title);
  }
}
