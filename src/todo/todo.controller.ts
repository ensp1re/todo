import { Controller, Get, HttpStatus, NotFoundException, Post, Res, Body, Query, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async getTasks(@Query() query: ListTasksDto, @Res() res: Response): Promise<void> {
        try {
            const tasks = await this.todoService.getPaginationTaskList(query);
            res.status(HttpStatus.OK).json({ message: 'Tasks', data: tasks });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `findAll() error: ${error}` }
            );
        }
    }

    @Post()
    async create(@Res() res: Response, @Body() createTaskDto: CreateTaskDto): Promise<void> {
        try {
            const task = await this.todoService.create(createTaskDto);
            res.status(HttpStatus.CREATED).json({ message: 'Task created', data: task });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `create() error: ${error}` });
        }
    }

    @Delete(":id")
    async delete(@Res() res: Response, @Query('id') id: number): Promise<void> {
        try {
            await this.todoService.findAndDelete(id);
            res.status(HttpStatus.OK).json({ message: 'Task deleted' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `delete() error: ${error}` });
        }
    }

    @Put(":id")
    async update(@Res() res: Response, @Query('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<void> {
        try {
            const task = await this.todoService.findAndUpdate(id, updateTaskDto);
            res.status(HttpStatus.OK).json({ message: 'Task updated', data: task });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `update() error: ${error}` });
        }
    }

    @Put(":id/done")
    async makeDone(@Res() res: Response, @Query('id') id: number): Promise<void> {
        try {
            const task = await this.todoService.findAndMakeDone(id);
            res.status(HttpStatus.OK).json({ message: 'Task updated', data: task });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `makeDone() error: ${error}` });
        }
    }

    @Put(":id/pending")
    async makePending(@Res() res: Response, @Query('id') id: number): Promise<void> {
        try {
            const task = await this.todoService.findAndMakePending(id);
            res.status(HttpStatus.OK).json({ message: 'Task updated', data: task });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `makePending() error: ${error}` });
        }
    }

    @ApiOperation({
        summary: 'Seed Tasks',
        description: 'Seeds the database with initial tasks for testing or demo purposes (15 Tasks).',
    })
    @Post("seed")
    async seed(@Res() res: Response): Promise<void> {
        try {
            const tasks = await this.todoService.seedTasks();
            res.status(HttpStatus.CREATED).json({ message: 'Tasks seeded', data: tasks });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: `seed() error: ${error}` });
        }
    }

}
