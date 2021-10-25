import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTasks(filterDto: GetTasksFilterDto): Promise<Todo[]>;
    getTaskById(id: string): Promise<Todo>;
    createTask(createTodoDto: CreateTodoDto): Promise<Todo>;
    updateTask(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    deleteTask(id: string): Promise<void>;
}
