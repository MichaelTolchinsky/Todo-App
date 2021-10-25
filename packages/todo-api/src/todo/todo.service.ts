import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>
  ) { }

  async findAll({search}: GetTasksFilterDto): Promise<Todo[]> {
    const query = this.todoRepo.createQueryBuilder('todo');
    
    if (search) {
      query.andWhere(
        '(LOWER(todo.task) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const todos = await query.getMany();
      return todos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Todo> {
    const foundTodo = await this.todoRepo.findOne(id);
    if (!foundTodo) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return foundTodo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepo.create(createTodoDto);
    await this.todoRepo.save(todo);

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    todo.task = updateTodoDto.task;
    await this.todoRepo.save(todo);
    return todo;
  }

  async delete(id: string): Promise<void> {
    const result = await this.todoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
