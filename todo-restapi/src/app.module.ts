import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks/task.model';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Exodus9!',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Task]),
    TasksModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
