import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Task } from '../src/tasks/task.model';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:', // Using SQLite with memory
          autoLoadModels: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  },5000);

  afterAll(async () => {
    await app.close();
  },5000);

  
  it('/tasks (POST) should create a new task', () => {
    const task = { title: 'Task 1' };

    return request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual(task.title);
      });
  });
});
