import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/task.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    SequelizeModule.forFeature([Todo]),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: (process.env.DB_HOST as string) || 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      username: (process.env.DB_USER as string),
      password: (process.env.DB_PASS as string),
      database: (process.env.DB_NAME as string),
      autoLoadModels: false,
      synchronize: true,
      models: [Todo],
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule { }
