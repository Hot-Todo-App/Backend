import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Sequelize } from 'typescript-sequelize';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let taskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the Sequelize instance from the app container
    sequelize = moduleFixture.get<Sequelize>(Sequelize);

    // Sync the test database to create tables
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
    await app.close();
  });

  it('should create a task', async () => {
    const taskDto = { title: 'Task title' };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(201);

    taskId = response.body.id;
    expect(response.body).toMatchObject({
      id: expect.any(String),
      title: taskDto.title,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
