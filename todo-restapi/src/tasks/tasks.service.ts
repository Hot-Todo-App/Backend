/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from '../dto/task.dto';
import { Op } from 'sequelize';
import { DATE_FIELDS } from '../types/dateFields.types';
import { TASKS_STATUS } from '../types/tasksStatus.types';


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
    
    if (startDate && endDate) {
      const formattedStartDate = new Date(startDate);
      const formattedEndDate = new Date(endDate);

      if (formattedEndDate < formattedStartDate){
        throw new Error("Oops Wrong dates...");
        return;
      }
    }
    

    if(startDate || endDate) where[dateField] = {}
    if(startDate) where[dateField][Op.gte] = new Date(startDate);      
    if(endDate)  where[dateField][Op.lte] = new Date(endDate);
  
    return this.taskModel.findAll<Task>({ where });
  }
  
  
  async findOne(id: string): Promise<Task> {
    return this.taskModel.findOne<Task>({ where: { id: id } });
  }

  async create(taskDto: Partial<TaskDto>): Promise<Task> {
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
  
  async updateTitle(id: string, newTitle: string): Promise<void> {
    const task = await this.taskModel.findByPk<Task>(id);
    if (task){
      Task.update(task, {where: {id:id}})
    }
  }
  
  
    
  //update completed or not (status)
  async updateTaskStatus(id: string, _status: TASKS_STATUS): Promise<Task> {
    const task = await this.taskModel.findOne<Task>({ where: { id: id } });
    if (task) {
      if (task.status !== _status) {
        const task1 = {
          id: task.id,
          title: task.title,
          status: _status,
          createdAt: task.createdAt,
          updatedAt: new Date(),
        };
        Object.assign(task, task1);
        return await task.save();
      }
    } else {
      throw new Error('Task not found...');
    }
  }
}  
