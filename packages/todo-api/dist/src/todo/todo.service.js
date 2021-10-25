"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entities/todo.entity");
let TodoService = class TodoService {
    constructor(todoRepo) {
        this.todoRepo = todoRepo;
    }
    async findAll({ search }) {
        const query = this.todoRepo.createQueryBuilder('todo');
        if (search) {
            query.andWhere('(LOWER(todo.task) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        try {
            const todos = await query.getMany();
            return todos;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async findOne(id) {
        const foundTodo = await this.todoRepo.findOne(id);
        if (!foundTodo) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        return foundTodo;
    }
    async create(createTodoDto) {
        const todo = this.todoRepo.create(createTodoDto);
        await this.todoRepo.save(todo);
        return todo;
    }
    async update(id, updateTodoDto) {
        const todo = await this.findOne(id);
        todo.task = updateTodoDto.task;
        await this.todoRepo.save(todo);
        return todo;
    }
    async delete(id) {
        const result = await this.todoRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map