import { Test } from '@nestjs/testing';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { TasksModule } from './tasks.module';
import { TasksService } from './tasks.service'; // Update the import statement
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { TASKS_STATUS } from '../types/tasksStatus.types';

describe('TaskService', () => {
  let taskService: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
          models: [Task],
        }),
      ],
      providers: [
        TasksService,
        {   provide: getModelToken(Task), 
            useValue: {
                create: jest.fn((taskData) => ({
                  id: uuidv4(),
                  title: taskData.title,
                  status: TASKS_STATUS.CREATED,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                })),
            },
        }
      ],
    }).compile();

    taskService = moduleRef.get<TasksService>(TasksService);
  });


  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should create a task', async () => {
    const taskDto = { title: 'Task title' };
    const createdTask = await taskService.create(taskDto);
    expect(createdTask).toBeDefined();
    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe(taskDto.title)
  });
});
