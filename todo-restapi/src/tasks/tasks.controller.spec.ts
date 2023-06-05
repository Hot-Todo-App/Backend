import { Test,TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController',()=>{
    let controller: TasksController;

    beforeAll(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [TasksService]
        }).compile();

        controller = module.get<TasksController>(TasksController);
    })
    it('should be defined',()=>{
        expect(controller).toBeDefined();
    })
})