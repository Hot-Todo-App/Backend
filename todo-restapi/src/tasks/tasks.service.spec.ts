import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { TASKS_STATUS } from '../types/tasksStatus.types';
import { Model } from 'sequelize-typescript';

jest.useRealTimers();

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskModel;
  
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
            findByPk: jest.fn().mockImplementation((id) => {
                const foundTask = tasks.find((task) => task.id === id);
                if (foundTask) {
                  return {
                    destroy: jest.fn().mockResolvedValue(foundTask),
                  };
                }
                return null;
              }),            
            destroy: jest.fn(),
            findOne: jest.fn().mockImplementation((options) => {
                if (options?.where?.id) {
                  // Implementation for findOne with ID parameter
                  const taskId = options.where.id;
                  const foundTask = tasks.find((task) => task.id === taskId);
                  return Promise.resolve(foundTask || null);
                } else {
                  // Implementation for other findOne calls
                  // For example, when finding by title
                  const taskTitle = options?.where?.title;
                  const foundTask = tasks.find((task) => task.title === taskTitle);
                  return Promise.resolve(foundTask || null);
                }
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
    taskModel = module.get(getModelToken(Task));

  });

  describe('createTask', () => {

    it('should be defined',()=>{
        expect(tasksService).toBeDefined();
    })

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
    it('should destroy a task by ID', async () => {
        const taskId = '4179f910-3a5a-4f62-af6e-7373af1b52ee';
      
        // Call the destroy method
        await tasksService.destroy(taskId);
      
        // Assert that the findByPk method was called with the correct argument
        expect(taskModel.findByPk).toHaveBeenCalledWith(taskId);
      
        // Assert that the destroy method was called on the task object
        const task = taskModel.findByPk.mock.results[0].value;
        expect(task.destroy).toHaveBeenCalledTimes(1);
    });
    it('should update task status by ID',async()=>{
        const taskId = '4179f910-3a5a-4f62-af6e-7373af1b52ee';
        const result = await tasksService.updateTaskStatus(taskId,TASKS_STATUS.IN_PROGRESS);
        
    })                
  });
})
