import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Task } from './task.model';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';

@Injectable()
export class SequelizeTestHelper implements SequelizeOptionsFactory {
  private sequelize: Sequelize;

  constructor(){
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
    })
  }

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'sqlite',
      storage: ':memory:',
      models: [Task], // Add your Sequelize models here
    }    
  }

  async onModuleInit() {
    await this.sequelize.sync({ force: true });
  }

  async clearDatabase() {
    await Promise.all(
      Object.values(this.sequelize.models).map((model) =>
        model.destroy({ truncate: true, cascade: true }),
      ),
    );
  }

  async closeConnection() {
    await this.sequelize.close();
  }
}
