import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module'
import * as request from 'supertest';
import { stringify } from 'querystring';
import { TASKS_STATUS } from '../src/types/tasksStatus.types';
import { response } from 'express';
import { Task } from '../src/tasks/task.model';
describe('Tasks Controller (e2e)', () => {
  let app: INestApplication;
  let id = "";
  
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
    .then((task)=>{
      id = task.body.id;
      expect(task).toBeDefined();
      expect(201);
    })
    
  })
  it('should get task by id', ()=>{
    return request(app.getHttpServer())
    .get(`/tasks/${id}`)
    .then((task)=>{
      expect((task)).toBeDefined()
      expect(task.body.id).toEqual(id);
    });
  })
  
  it('should update a task status by id', ()=>{
    return request(app.getHttpServer())
    .put(`/tasks/${id}/status/${TASKS_STATUS.COMPLETED}`)
    .then((task)=>{
      expect(task).toBeDefined();      
      expect(task.body.status).toEqual(TASKS_STATUS.COMPLETED)
    })
  })
  it('should update a task title by id', ()=>{
    const newTitle = "new!"
    return request(app.getHttpServer())
    .put(`/tasks/${id}/title/${newTitle}`)
    .then((task)=>{
      console.log(`/tasks/${id}/${newTitle}`)
      expect(task).toBeDefined();
      expect(task.body.title).toEqual(newTitle)
    })
  })
  it('should delete task by id', ()=>{
    return request(app.getHttpServer())
    .delete(`/tasks/${id}`)
    .then((result)=>{
      expect(result.status).toBe(200)
    })
  })
});
