/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
@ApiTags('tasks')
@Controller('tasks')
@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll<Task>();
  }
}
