/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'TASKS_REPOSITORY',
      useValue: Task,
    },
  ],
  exports: [TasksService],
})
export class TasksModule {}
