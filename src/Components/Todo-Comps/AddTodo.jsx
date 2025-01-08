import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoIosAddCircle } from "react-icons/io";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../Services/todo-services";

const AddTodo = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.user);
  const user_id = _id;
  const { error } = useSelector((state) => state.todo);

  const initialValues = {
    title: "",
    description: "",
    priority: "",
    date: "",
    time: "",
  };


  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(15, "maximum 15 characters")
      .required("Title is Required"),
    description: Yup.string()
      .max(80, "maximum 45 characters")
      .required("Description is Required"),
  });

  const handleonSubmit = async (values, { setSubmitting, resetForm }) => {
    const todo = { ...values, user_id };
    const action = await dispatch(addTodo(todo));
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      <div
        className="todo-container font-primary flex flex-col my-3 px-3 w-full sm:w-3/5 mx-auto 
      lg:gap-x-4 lg:flex-row lg:flex-wrap lg:w-full"
      >
        <Formik
          method="POST"
          initialValues={initialValues}
          onSubmit={handleonSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <div
                className="todo-form w-full py-4 mx-auto ps-3 shadow-customPositive relative rounded-md flex
           flex-row  lg:px-5 lg:w-2/5 bg-white"
              >
                <div className="todo-left w-2/5 lg:w-3/5 flex flex-col justify-center ">
                  <div className="title-container">
                    <Field
                      type="text"
                      name="title"
                      className="text-black text-2xl font-bold border-none outline-none placeholder-black"
                      placeholder="Add Title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="error text-xs text-red-500"
                    />
                  </div>

                  <div className="description-container my-2">
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Add Description"
                      className="text-xs px-1 w-full text-grayCustom sm:pe-4 sm:text-md lg:text-lg border-none
                 outline-none"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error text-xs text-red-500"
                    />
                  </div>

                  <div className="deadline-container mt-auto text-grayCustom">
                    <p className="px-1 text-sm font-bold text-grayCustom sm:pe-4">
                      Add Date
                    </p>
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
                        value={`${1}`}
                        className="me-0.5 w-3"
                      />
                      <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium uppercase text-white bg-dangerRed ring-1 ring-inset ring-gray-500/10">
                        HIGH
                      </span>
                    </div>

                    <div className="priority-selector">
                      <Field
                        type="radio"
                        id="medium"
                        name="priority"
                        value={`${2}`}
                        className="me-0.5 w-3"
                      />
                      <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium uppercase text-white bg-amberYellow ring-1 ring-inset ring-gray-500/10">
                        MEDIUM
                      </span>
                    </div>

                    <div className="priority-selector">
                      <Field
                        type="radio"
                        id="low"
                        name="priority"
                        value={`${3}`}
                        className="me-0.5 w-3"
                      />
                      <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium uppercase text-white bg-oceanBlue ring-1 ring-inset ring-gray-500/10">
                        LOW
                      </span>
                    </div>
                  </div>

                  <div className="deadline-container inline-block mt-auto ps-3 mx-auto  text-grayCustom lg:m-0">
                    <p className="px-1 text-sm font-bold text-grayCustom sm:pe-4">
                      Add Time
                    </p>
                    <Field
                      type="time"
                      name="time"
                      id="time"
                      className="text-grayCustom border-solid border-2 w-auto text-xs sm:text-sm lg:text-md border-black text-center"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-green-700 px-1 
                   h-full block absolute right-0 top-0 ms-auto rounded-md text-white"
                  disabled={isSubmitting}
                >
                  <IoIosAddCircle className="mx-auto text-5xl lg:text-4xl xl:text-5xl" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddTodo;
