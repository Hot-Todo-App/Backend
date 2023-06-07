import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { TASKS_STATUS } from '../types/tasksStatus.types';

jest.useRealTimers();

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const tasks = [
        {
          id: '4179f910-3a5a-4f62-af6e-7373af1b52ee',
          title: 'Task title',
          status: TASKS_STATUS.CREATED,
          createdAt: new Date('2023-06-07T07:56:03.000Z'),
          updatedAt: new Date('2023-06-07T07:56:03.000Z'),
        },
        {
          id: '8e4a154a-bcee-4216-9114-fb8a9536b5a9',
          title: 'Task Title',
          status: TASKS_STATUS.CREATED,
          createdAt: new Date('2023-06-06T09:19:23.000Z'),
          updatedAt: new Date('2023-06-06T09:19:23.000Z'),
        },
        {
          id: 'aaa4912c-aa66-42e4-8e5b-3280c777eb4d',
          title: 'Task title',
          status: TASKS_STATUS.CREATED,
          createdAt: new Date('2023-06-07T07:59:47.000Z'),
          updatedAt: new Date('2023-06-07T07:59:47.000Z'),
        },
      ];
  
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [TasksService, {
        provide: getModelToken(Task),
        useValue: {
            findOne: jest.fn().mockImplementation((options) => {
                const taskId = options.where.id;
                const foundTask = tasks.find((task) => task.id === taskId);
                return Promise.resolve(foundTask || null);
              }),
            findAll: jest.fn().mockReturnValue(tasks),
            create: jest.fn((taskData) => ({
                id: uuidv4(),
                title: taskData.title,
                status: TASKS_STATUS.CREATED,
                createdAt: new Date(),
                updatedAt: new Date(),
              })),
            
        }
      }],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  describe('createTask', () => {
    it('should create a task', async () => {
        const taskDto = { title: 'Task title' };
        const createdTask = await tasksService.create(taskDto);
        expect(createdTask).toBeDefined();
        expect(createdTask.id).toBeDefined();
        expect(createdTask.title).toBe(taskDto.title)
        expect(createdTask.createdAt).toBeInstanceOf(Date);
        expect(createdTask.updatedAt).toBeInstanceOf(Date);
    });
    it('should get all tasks', async () => {
        const result = await tasksService.findAll();
  
        expect(result.length).toBe(3);
    });
    it('should find a task by ID', async () => {
        const taskId = '4179f910-3a5a-4f62-af6e-7373af1b52ee';
        const result = await tasksService.findOne(taskId);
        expect(result).toBeDefined();
        expect(result?.id).toEqual(taskId);
        // Assert other properties of the task
      });
      
  })
});
