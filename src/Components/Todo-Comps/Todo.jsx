import React from "react";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaSquarePen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { setDate, setTime } from "../../utils/utils";
import { useDeleteTodoMutation } from "../../Store/todo-api-slice";

const Todo = ({ todo, setUpdating}) => {

  const [deleteTodo,{isLoading,error}] = useDeleteTodoMutation();

  const priorityArray = ["HIGH", "MID", "LOW"];
  const ColorArray = ["dangerRed", "amberYellow", "oceanBlue"];
  
  
  const onUpdate = (id) => {
    setUpdating(id);
  }

  return (
    <>
      <div
        className={`todo-item w-full lg:max-h-44  md:w-3/5 mx-auto p-3 ps-3  shadow-customPositive rounded-sm flex flex-row  
         lg:px-5 lg:w-2/5  bg-white my-5`}
      >
        <div className="todo-left w-4/5">
          <span
            className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold bg-${
              ColorArray[todo.priority - 1]
            } text-white uppercase text-whit  ring-1 mb-3 ring-inset ; ring-gray-500/10`}
          >
            {priorityArray[todo.priority - 1]}
          </span>

          <h1 className="font-bold text-2xl mb-3 mt-2 ">{todo.title}</h1>
          <p className="text-md mb-3 px-1  text-grayCustom sm:pe-4 sm:text-md lg:text-12 ">
            {todo.description}
          </p>

          {todo.date ? (
            <div className="date ms-5 flex text-grayCustom">
              <BsCalendar2CheckFill />

              <p className="text-xs ms-1">
                <span className="ms-1 mt-1 font-bold">
                  {`${todo.date ? setDate(todo.date) : " "} 
          ${todo.time ? setTime(todo.time) : " "}`}
                </span>
              </p>
            </div>
          ) : null}
        </div>


        <div className="todo-right text-white  gap-2 w-1/5 flex items-center mt-5 lg:w-1/5">
          <button
            className="p-1 bg-green-400"
            onClick={() => {
              onUpdate(todo._id);
            }}
          >
            <FaSquarePen className="mx-auto text-xl lg:text-3xl" />
          </button>

          <button
            className="p-1 bg-softRed"
            onClick={() => {
              deleteTodo(todo);
            }}
          >
            <MdDelete className="mx-auto text-xl lg:text-3xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
