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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
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
