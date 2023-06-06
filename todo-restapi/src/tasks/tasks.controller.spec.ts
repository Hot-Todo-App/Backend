import { Test,TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { v4 as uuidv4 } from 'uuid';
import { TASKS_STATUS } from '../types/tasksStatus.types';
import { TaskDto } from 'src/dto/task.dto';

describe('TasksController',()=>{
    let controller: TasksController;

    const mockTasksService = {
        create: jest.fn(dto=>{
            return {
                id: Date.now(),
                status: "CREATED",
                createdAt: new Date(),
                updatedAt: new Date(),
                ...dto
            }
        }),
        updateTaskStatus: jest.fn(dto=>{
            return {
                id: dto.id,
                title: dto.title,
                status: "CREATED",
                createdAt: dto.createdAt,
                updateAt: new Date()
    
            }
        }),
        findOne: jest.fn(dto=>{
            return{
             id:'7f5ec651-6029-4147-97fa-a10617008c0f',
              title: 'Task Title',
              status: TASKS_STATUS.CREATED,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
        })
    }

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [TasksService]
        }).overrideProvider(TasksService).useValue(mockTasksService).compile();

        controller = module.get<TasksController>(TasksController);
    })
    it('should be defined',()=>{
        expect(controller).toBeDefined();
    })
    it('should create a task', ()=>{
        const id = uuidv4();
        const dto = {
            id: id,
            title: "To do the lalala",
            status: TASKS_STATUS.CREATED,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        expect(controller.addTask(dto)).toEqual({
            id: expect.any(String),
            title: "To do the lalala",
            status: TASKS_STATUS.CREATED,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          });
        });
        it('should find a task by ID', async () => {
            const id = '7f5ec651-6029-4147-97fa-a10617008c0f';
            const task: TaskDto = {
              id: id,
              title: 'Task Title',
              status: TASKS_STATUS.CREATED,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            const result = await controller.findOne(id);

            expect(result).toEqual(task);
          });
    });

