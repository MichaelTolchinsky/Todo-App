import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
export declare class TodoService {
    private todoRepo;
    constructor(todoRepo: Repository<Todo>);
    findAll({ search }: GetTasksFilterDto): Promise<Todo[]>;
    findOne(id: string): Promise<Todo>;
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    delete(id: string): Promise<void>;
}
