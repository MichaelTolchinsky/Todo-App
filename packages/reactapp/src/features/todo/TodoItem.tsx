import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Todo } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const TodoItemContainer = styled.div`
  ${tw`
  flex w-full p-4 mb-2 justify-between items-center
  `}
`;

const TaskContainer = styled.p`
  ${tw`
  ml-2 text-xl font-sans font-medium
  `}
`;

const EditTaskContainer = styled.input`
  ${tw`
  ml-2 text-xl font-sans font-medium
  `}
`;

const ActionsContainer = styled.div`
  ${tw`
  w-1/6 flex justify-between items-center mr-2
  `}
`;

const DeleteButtonContainer = styled.button`
  ${tw`
  h-7 w-7 flex justify-center items-center bg-red-400 hover:bg-red-500 text-white font-bold  rounded
  `}
`;

const EditButtonContainer = styled.button`
  ${tw`
  h-7 w-7 flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded
  `}
`;

const SaveButtonContainer = styled.button`
  ${tw`
  h-7 w-7 flex justify-center items-center bg-green-500 hover:bg-green-600 text-white font-bold  rounded
  `}
`;

type TodoItemProps = {
  todo: Todo;
  handleDeleteTodo: (e: FormEvent, id: string) => void;
  handleEditTodo: (e: FormEvent, { id, task }: Todo) => void;
};

const TodoItem = ({
  todo,
  handleDeleteTodo,
  handleEditTodo,
}: TodoItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<string>(todo.task);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleUpdateCurrentTodo = (e: ChangeEvent, newValue: string) => {
    e.preventDefault();
    setCurrentTodo(newValue);
  };

  return (
    <TodoItemContainer>
      {editMode ? (
        <EditTaskContainer
          value={currentTodo}
          onChange={(e: ChangeEvent) =>
            handleUpdateCurrentTodo(e, (e.target as HTMLInputElement).value)
          }
        />
      ) : (
        <TaskContainer>{currentTodo}</TaskContainer>
      )}

      <ActionsContainer>
        <DeleteButtonContainer
          aria-label={editMode ? "Edit a Todo" : "Delete a todo"}
          onClick={
            editMode
              ? handleCancelEdit
              : (e: FormEvent) => handleDeleteTodo(e, todo.id)
          }
        >
          X
        </DeleteButtonContainer>
        {editMode ? (
          <SaveButtonContainer
            onClick={(e: FormEvent) => {
              handleEditTodo(e, { id: todo.id, task: currentTodo });
              handleCancelEdit();
            }}
          >
            <FontAwesomeIcon icon={faSave} />
          </SaveButtonContainer>
        ) : (
          <EditButtonContainer onClick={handleEditMode}>
            <FontAwesomeIcon icon={faEdit} />
          </EditButtonContainer>
        )}
      </ActionsContainer>
    </TodoItemContainer>
  );
};

export default TodoItem;
