import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";
import { setDate, setTime } from "../../utils/utils";
import { useUpdateTodoMutation } from "../../Store/todo-api-slice";
import { MdOutlineCancel } from "react-icons/md";

const UpdateTodo = ({ todo, setUpdating }) => {
  const [checkState, setCheckState] = useState(todo.priority);
  const [updateTodo, { isLoading, error }] = useUpdateTodoMutation();

  const handleOnCheck = (e, setFieldValue) => {
    const value = Number(e.target.value); // Ensure value is a number
    setCheckState(value);
    setFieldValue("priority", value); // Update Formik's state
  };

  console.log("priority", todo.priority);

  const initialValues = {
    title: todo.title,
    description: todo.description,
    date: todo.date,
    time: todo.time,
    priority: todo.priority,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
  });

  const handleonSubmit = async (values, { setSubmitting }) => {
    const updatedTodo = { _id: todo._id, user_id: todo.user_id };

    Object.keys(values).forEach((key) => {
      if (values[key] !== initialValues[key]) {
        updatedTodo[key] = values[key];
      }
    });

    if (todo.priority !== checkState) {
      updateTodo.priority = checkState;
    }

    updateTodo(updatedTodo);
    setUpdating(null);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        method="POST"
        initialValues={initialValues}
        onSubmit={handleonSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, dirty, setFieldValue }) => (
          <Form
            className="w-full lg:px-5 lg:w-2/5 md:w-3/5 mx-auto my-5 p-3 ps-3 shadow-customPositive relative rounded-sm flex flex-row  
            bg-white"
          >
            <div className="todo-left lg:w-3/5 w-2/5 flex flex-col justify-center ">
              <div className="title-container">
                <Field
                  type="text"
                  name="title"
                  placeholder={todo.title}
                  className="text-black text-2xl font-bold border-none outline-none placeholder-black"
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              <div className="description-container my-2">
                <Field
                  as="textarea"
                  name="description"
                  placeholder={todo.description}
                  className="text-xs px-1 w-full text-grayCustom sm:pe-4 sm:text-md lg:text-lg border-none
                 outline-none"
                />
              </div>

              <div className="deadline-container mt-auto text-grayCustom">
                <p className="ps-1 text-sm font-bold text-grayCustom sm:pe-4">
                  Update Date
                </p>
                {todo.date ? (
                  <p className="text-xs my-1 ps-1 font-semibold">
                    {setDate(todo.date)}
                  </p>
                ) : null}

                <Field
                  type="date"
                  name="date"
                  id="date"
                  className="text-grayCustom border-solid border-2 w-auto text-xs sm:text-sm lg:text-md border-black text-center"
                />
              </div>
            </div>

            <div className="todo-right w-2/5 lg:w-3/5 flex flex-col">
              <div className="priority-container mx-auto lg:ms-3 my-auto">
                <div className="priority-selector">
                  <Field
                    type="radio"
                    id="high"
                    name="priority"
                    value={1}
                    className="me-0.5 w-3"
                    checked={checkState === 1 ? "checked" : null}
                    onChange={(e) => handleOnCheck(e, setFieldValue)}
                  />
                  <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium uppercase text-white bg-dangerRed ring-1 ring-inset ring-gray-500/10">
                    HIGH
                  </span>
                </div>

                <div className="priority-selector">
                  <Field
                    type="radio"
                    id="medium"
                    value={2}
                    name="priority"
                    className="me-0.5 w-3"
                    checked={checkState === 2 ? "checked" : null}
                    onChange={(e) => handleOnCheck(e, setFieldValue)}
                  />
                  <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium uppercase text-white bg-amberYellow ring-1 ring-inset ring-gray-500/10">
                    MEDIUM
                  </span>
                </div>

                <div className="priority-selector">
                  <Field
                    type="radio"
                    id="low"
                    value={3}
                    name="priority"
                    className="me-0.5 w-3"
                    checked={checkState === 3 ? "checked" : null}
                    onChange={(e) => handleOnCheck(e, setFieldValue)}
                  />
                  <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium uppercase text-white bg-oceanBlue ring-1 ring-inset ring-gray-500/10">
                    LOW
                  </span>
                </div>
              </div>

              <div className="deadline-container inline-block mt-auto ps-3 mx-auto lg:m-0  text-grayCustom">
                <p className="ps-1 text-sm font-bold text-grayCustom sm:pe-4">
                  Update Time
                </p>
                {todo.date ? (
                  <p className="text-xs my-1 ps-1 font-semibold">
                    {setTime(todo.time)}
                  </p>
                ) : null}
                <Field
                  type="time"
                  name="time"
                  id="time"
                  className="text-grayCustom border-solid border-2 w-auto text-xs sm:text-sm lg:text-md border-black text-center"
                />
              </div>

              <button
                onClick={() => {
                  setUpdating(null);
                }}
              >
                <MdOutlineCancel className="absolute left-0 top-0 text-red-500 w-5 h-5" />
              </button>
            </div>

            <button
              disabled={!dirty || isSubmitting}
              type="submit"
              className={` ${dirty ? "bg-green-700" : "bg-gray-500"} px-1 
                   h-full block absolute right-0 top-0 ms-auto rounded-md text-white`}
            >
              <RxUpdate className="mx-auto text-5xl lg:text-4xl xl:text-5xl" />
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateTodo;
