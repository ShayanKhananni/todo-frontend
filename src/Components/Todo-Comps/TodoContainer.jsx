import React, { useState } from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import UpdateTodo from "./UpdateTodo";
import Sorter from "./Sorter";
import { useGetTodosQuery } from "../../Store/todo-api-slice";

const TodoContainer = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const { data: todos = [], isLoading } = useGetTodosQuery(_id, { skip: !_id });

  const [sorting, setSorting] = useState(null);
  const [updateState, setUpdateState] = useState(null);


  const setUpdating = (id) => {
    setUpdateState((prev) => (prev === id ? null : id));
  };

  console.log("Render");

  const handleSort = (value) => {
    setSorting(value);
  };

  const getSortedTodos = () => {
    let sortedTodos = [...todos];

    if (sorting === "Priority") {
      sortedTodos.sort((a, b) => a.priority - b.priority);
    } else if (sorting === "Date") {
      sortedTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return sortedTodos;
  };

  return (
    <div className="todo-container relative font-primary flex flex-col mt-5 gap-y-4 p-4 w-full sm:w-3/5 mx-auto lg:gap-x-4 lg:flex-row lg:flex-wrap md:w-full">
      <Sorter handleSort={handleSort} />

      {isLoading ? (
        <h1 className="mx-auto text-center text-4xl message text-gray-600 font-bold">
          Loading Todos...
        </h1>
      ) : todos.length === 0 ? (
        <h1 className="mx-auto text-center text-4xl message text-gray-600 font-bold">
          Please Add Some Todos
        </h1>
      ) : (
        getSortedTodos().map((todo) =>
          todo._id === updateState ? (
            <UpdateTodo key={todo._id} todo={todo} setUpdating={setUpdating} />
          ) : (
            <Todo key={todo._id} setUpdating={setUpdating} todo={todo} />
          )
        )
      )}
    </div>
  );
};

export default TodoContainer;
