import React, { FormEvent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AddTodo from "./AddTodo";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./todoAPI";
import TodoItem from "./TodoItem";
import { Todo as TodoType } from "./types";

const TodoContainer = styled.div`
  ${tw`
  w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center
  `}
`;

const Todo = () => {
  const { data, isSuccess } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleDeleteTodo = (e: FormEvent, id: string) => {
    e.preventDefault();
    deleteTodo({ id });
  };

  const handleAddTodo = (e: FormEvent, task: string) => {
    e.preventDefault();
    addTodo({ task });
  };

  const handleEditTodo = (e: FormEvent, updatedTodo: TodoType) => {
    e.preventDefault();
    updateTodo(updatedTodo);
  };

  return (
    <TodoContainer>
      <AddTodo handleAddTodo={handleAddTodo} />
      {isSuccess &&
        data?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
        ))}
    </TodoContainer>
  );
};

export default Todo;
