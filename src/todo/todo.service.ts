import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Pagination, Task } from './interfaces/todo.interface';
import { ListTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class TodoService {

    constructor(@InjectModel(Todo) private taskModel: typeof Todo) { }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = await this.taskModel.create(createTaskDto);
        return task;
    }

    async getPaginationTaskList(query: ListTasksDto): Promise<Pagination> {

        let { page = 1, pageSize = 10, status, sortBy, orderBy } = query;

        page = Math.max(1, parseInt(page as any, 10) || 1);
        pageSize = Math.min(100, Math.max(1, parseInt(pageSize as any, 10) || 10));


        console.log(query);

        const where: any = {};
        if (status) {
            where.status = status;
        }

        const tasks = await this.taskModel.findAndCountAll({
            where,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: sortBy ? [[sortBy, orderBy || 'asc']] : undefined
        });

        return {
            page,
            pageSize,
            total: tasks.count,
            tasks: tasks.rows.length ? tasks.rows : []
        };
    }

    async findAndDelete(id: number): Promise<void> {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        await task.destroy();
    }

    async findAndMakeDone(id: number): Promise<Task> {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.status = 'done';
        await task.save();

        return task;
    }

    async findAndMakePending(id: number): Promise<Task> {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.status = 'pending';
        await task.save();

        return task;
    }

    async findAndUpdate(id: number, updateDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskModel.findByPk(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.title = updateDto.title;
        task.description = updateDto.description;

        await task.save();
        return task;
    }

    async seedTasks(): Promise<Task[]> {
        const count = 15;
        const createdTasks: Task[] = [];
        for (let i = 0; i < count; i++) {
            const task = await this.taskModel.create({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                status: Math.random() > 0.5 ? 'done' : 'pending'
            });
            createdTasks.push(task);
        }
        return createdTasks;
    }
}
