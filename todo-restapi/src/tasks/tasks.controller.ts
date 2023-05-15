/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
  @Post()
  createTask(@Body() task): Promise<Task> {
    return this.taskService.createTask(task);
  }
}
