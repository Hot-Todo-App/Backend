import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module'
import * as request from 'supertest';
import { stringify } from 'querystring';
import { TASKS_STATUS } from '../src/types/tasksStatus.types';

describe('Tasks Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a user',()=>{
    return request(app.getHttpServer())
    .post("/tasks")
    .send({
      title: "new ttile"
    })
    .expect(201)
  })
  it('should get task by id', ()=>{
    const id = '60503e85-1c5d-44f3-bb5e-f0ca2a7c7e96'
    return request(app.getHttpServer())
    .get(`/tasks/${id}`)
    .then((task)=>{
      expect((task)).toBeDefined()
      expect(task.body.id).toEqual(id);
    });
  })
  it('should delete task by id', ()=>{
    const id = '60503e85-1c5d-44f3-bb5e-f0ca2a7c7e96'
    return request(app.getHttpServer())
    .delete(`tasks/${id}`)
    .then((result)=>{
      expect(result).toBeCalledTimes(1);
    })
  })
  it('should update a task status by id', ()=>{
    const id = '60503e85-1c5d-44f3-bb5e-f0ca2a7c7e96'
    return request(app.getHttpServer())
    .put(`/tasks/${id}/status=${TASKS_STATUS.COMPLETED}`)
    .then((task)=>{
      expect(task).toBeDefined();      
      expect(task.body.status.split("=")[1]).toEqual(TASKS_STATUS.COMPLETED)
    })
  })
  it('should update a task title by id', ()=>{
    const id = '60503e85-1c5d-44f3-bb5e-f0ca2a7c7e96'
    const newTitle = "new!"
    return request(app.getHttpServer())
    .put(`/tasks/${id}/${newTitle}`)
    .then((task)=>{
      console.log(`/tasks/${id}/title=${newTitle}`)
      expect(task).toBeDefined();
      console.log(task.body.title.split("=")[1])
      expect(task.body.title.split("=")[1]).toEqual(newTitle)
    })
  })
});
