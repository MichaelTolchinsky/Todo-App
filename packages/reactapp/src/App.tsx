import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import "./App.css";
import Todo from "./features/todo/Todo";

const AppContainer = styled.div`
  ${tw`
    h-screen flex justify-center items-center bg-gray-100
  `}`


function App() {
  return (
    <AppContainer>
      <Todo/>
    </AppContainer>
  );
}

export default App;
