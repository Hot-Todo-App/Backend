/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from '../dto/task.dto';
import { Op } from 'sequelize';
import { DATE_FIELDS } from 'src/types/dateFields.types';
import { TASKS_STATUS } from 'src/types/tasksStatus.types';


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


  async findTasksBy(
    status: TASKS_STATUS,
    dateField: DATE_FIELDS,
    startDate: string,
    endDate: string
  ): Promise<Task[]> {
    const where: any = { status};
    console.log(where)

    if(endDate || startDate)
    where[dateField] = {
      [Op.lte]: endDate ? new Date(endDate) : undefined,
      [Op.gte]: startDate ? new Date(startDate): undefined,
    };

  
    return this.taskModel.findAll<Task>({ where });
  }
  
  
  async findOne(id: string): Promise<Task> {
    return this.taskModel.findOne<Task>({ where: { id: id } });
  }

  async create(taskDto: TaskDto): Promise<Task> {
    const { ...taskData } = taskDto;
    const id = uuidv4();
    taskData.id = id;
    taskData.status = TASKS_STATUS.CREATED;
    return this.taskModel.create<Task>(taskData);
  }
  async destroy(id: string): Promise<void> {
    const task = await this.taskModel.findByPk<Task>(id);
    if (task) {
      await task.destroy();
    } else {
      throw new Error('Task not found');
    }
  }
  async updateTitle(id: string, newTitle: string): Promise<Task> {
    const task = await this.taskModel.findOne<Task>({ where: { id: id } });
    if (task) {
      const task1 = {
        id: task.id,
        title: newTitle,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: new Date(),
      };
      return await task.update(task1, { where: { id: id } });
    } else {
      throw new Error('Task not found...');
    }
  }
  //update completed or not (status)
  async updateTaskStatus(id: string): Promise<Task> {
    const task = await this.taskModel.findOne<Task>({ where: { id: id } });
    const newStatus = !task.status;
    if (task) {
      const task1 = {
        id: task.id,
        title: task.title,
        status: newStatus,
        createdAt: task.createdAt,
        updatedAt: new Date(),
      };
      console.log(task1);
      return await task.save();
    } else {
      throw new Error('Task not found...');
    }
  }
}
