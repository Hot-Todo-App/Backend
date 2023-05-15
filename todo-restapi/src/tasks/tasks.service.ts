/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
@ApiTags('tasks')
@Controller('tasks')
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll<Task>();
  }
  async create(task: Task): Promise<Task> {
    const { id, ...taskData } = task;
    return this.taskModel.create<Task>(taskData);
  }
  async destroy(id: number): Promise<void> {
    const task = await this.taskModel.findByPk<Task>(id);
    if (task) {
      await task.destroy();
    } else {
      throw new Error('Task not found');
    }
  }
  async updateTitle(id: number, title: string): Promise<void> {
    const task1 = await this.taskModel.findByPk<Task>(id);
    if (task1) {
      await task1.update({ title }, { where: { id: id } });
    } else {
      throw new Error('Task not found...');
    }
  }
}
