import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const FormContainer = styled.form`
  ${tw`
    flex justify-between w-full
  `}
`;

const InputContainer = styled.input`
  ${tw`
  flex-1 rounded shadow p-2 text-gray-600 mr-2
  `}
`;

type AddTodoProps = {
  handleAddTodo: (e: FormEvent, task: string) => any;
};

const AddTodo = ({ handleAddTodo }: AddTodoProps) => {
  const [task, setTask] = useState("");

  return (
    <FormContainer onSubmit={(e: FormEvent) => handleAddTodo(e, task)}>
      <InputContainer
        type="text"
        name="task"
        onChange={(e: ChangeEvent) => {
          e.preventDefault();
          setTask((e.target as HTMLInputElement).value);
        }}
      />
      <button type="submit" aria-label="Add Todo">
        <FontAwesomeIcon icon={faPlusCircle} size="3x" />
      </button>
    </FormContainer>
  );
};

export default AddTodo;
