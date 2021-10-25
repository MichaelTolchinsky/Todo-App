import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Todo[]> {
    return this.todoService.findAll(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post('/add')
  createTask(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
