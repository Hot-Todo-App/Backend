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
  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }
  @Delete(':id')
  @ApiParam({ name: 'id' })
  destroy(@Param('id') id: number): Promise<void> {
    return this.taskService.destroy(id);
  }
  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'title' })
  update(@Param('id') id: number, @Param('title') title): Promise<void> {
    return this.taskService.updateTitle(id, title);
  }
}
