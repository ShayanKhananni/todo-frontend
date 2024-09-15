import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../Services/todo-services";
import Todo from "./Todo";
import UpdateTodo from "./UpdateTodo";
import Sorter from "./Sorter";

const TodoContainer = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const { todos } = useSelector((state) => state.todo);
  const [sorting, setSorting] = useState(null);
  const dispatch = useDispatch();
  const loadTodo = async (id) => {
    try {
      const action = await dispatch(getTodos(id));
      console.log(action);
      if (action.type.includes("fulfilled")) {
        console.log(action.payload);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    console.log("initial");
    loadTodo(_id);
  }, []);

  const handleSort = (value) =>
  {
    setSorting(value)
  }

  return (
    <>

      <div className="todo-container relative font-primary flex flex-col mt-5 gap-y-4 p-4 w-full sm:w-3/5 mx-auto lg:gap-x-4 lg:flex-row lg:flex-wrap md:w-full">

      <Sorter handleSort={handleSort} />


        {todos.length === 0 ? (
          <h1 className="mx-auto text-center text-4xl message text-gray-600 font-bold">
            Please Add Some Todos
          </h1>
        ) : (
          (() => {
            let sortedTodos;

            switch (sorting) {
              case "Priority":
                sortedTodos = [...todos].sort(
                  (a, b) => a.priority - b.priority
                );
                break;

              case "Date":
                sortedTodos = [...todos].sort(
                  (a, b) => new Date(a.date) - new Date(b.date)
                );
                break;

              default:
                sortedTodos = [...todos];
                break;
            }

            return sortedTodos.map((todo) =>
              todo.updating ? (
                <UpdateTodo todo={todo} />
              ) : (
                <Todo key={todo._id} todo={todo} />
              )
            );
          })()
        )}
      </div>
    </>
  );
};

export default React.memo(TodoContainer);
