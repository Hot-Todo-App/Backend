import { Test,TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.model';

describe('TasksController',()=>{
    let controller: TasksController;

    const mockTasksService = {
        create: jest.fn(dto=>{
            return {
                id: Date.now(),
                createdAt: new Date(),
                updatedAt: new Date(),
                ...dto
            }
        }),
        updateTaskStatus: jest.fn(dto=>{
            return {
                id: dto.id,
                title: dto.title,
                status: true,
                createdAt: dto.createdAt,
                updateAt: new Date()
    
            }
        }),
        findAll: jest.fn().mockRejectedValue([
            {
                "id": "50749d0c-bf4b-4669-8771-1d8805838d22",
                "title": "To do the laundry",
                "status": true,
                "createdAt": "2023-06-05T06:41:18.000Z",
                "updatedAt": "2023-06-05T14:21:18.000Z"
              },
              {
                "id": "cf1e3956-cb15-4892-8600-382605c2e8f4",
                "title": "Go to the gym",
                "status": false,
                "createdAt": "2023-06-05T12:10:37.000Z",
                "updatedAt": "2023-06-05T12:22:55.000Z"
              },
              {
                "id": "e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0",
                "title": "To do the lalala",
                "status": true,
                "createdAt": "2023-06-05T06:41:18.000Z",
                "updatedAt": "2023-06-05T14:12:54.000Z"
              }
        ]),
        findOne: jest.fn(dto=>{
            return {
                id: "e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0",
                title: "To do the lalala",
                status: true,
                createdAt: "2023-06-05T06:41:18.000Z",
                updatedAt: "2023-06-05T14:12:54.000Z"
            }
        }),
        destroy: jest.fn(dto=>{
            return {
                id: "e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0",
                title: "To do the lalala",
                status: true,
                createdAt: "2023-06-05T06:41:18.000Z",
                updatedAt: "2023-06-05T14:12:54.000Z"
            }
        }),
        
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
            status: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        expect(controller.addTask(dto)).toEqual({
            id: expect.any(String),
            title: "To do the lalala",
            status: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          });

        //   expect(mockTasksService.create).toHaveBeenCalledWith({title:"To do the lalala",status: false});
    })
    // it('should update a task status', () => {
    //     const dto = {
    //       id: "e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0",
    //       title: "To do the lalala",
    //       status: false,
    //       createdAt: "2023-06-05T06:41:18.000Z",
    //       updatedAt: "2023-06-05T07:13:01.000Z"
    //     };
        
    //     const updatedTask = controller.updateStatus(dto.id);
        
    //     expect(updatedTask).toEqual({
    //       id: dto.id,
    //       title: dto.title,
    //       status: true,
    //       createdAt: dto.createdAt
    //     });
    //   });
    it('should get task by id', async () => {
        const taskId = "e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0";
      
        // Call the findOne() method with the task ID
        const result = await controller.findOne(taskId);
      
        // Make assertions on the returned result
        expect(result).toBeDefined(); // Ensure that the result is not undefined
        expect(result.id).toBe(taskId); // Check if the ID of the returned task matches the input task ID
        // Add more assertions to check other properties of the task if needed
      });
      
      it('should delete a task by its ID', async () => {
        const taskId = 'e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0';
        
        // Call the destroy() method of the controller
        const result = await controller.destroy(taskId);
    
        // Verify that the destroy() method of the taskService was called with the correct ID
        // expect(controller.destroy(taskId)).toHaveBeenCalledWith(taskId);

        expect(result).toEqual({
            id: "e06f8dfe-ad25-4482-9cf9-b38c7ba1d7a0",
            title: "To do the lalala",
            status: true,
            createdAt: "2023-06-05T06:41:18.000Z",
            updatedAt: "2023-06-05T14:12:54.000Z"
        });
        
    });    
})
