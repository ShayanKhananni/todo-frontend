import React from "react";
import TodoContainer from "../Components/Todo-Comps/TodoContainer";
import AddTodo from "../Components/Todo-Comps/AddTodo";
import Header from "../Components/Header";

const Home = () => {
  return (
    <>
    
    <Header/>
    <AddTodo/>
    <TodoContainer/>
    </>
  );
};

export default Home;
