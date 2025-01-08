import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { sigininUser } from "../Services/auth-services";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sessionActions } from "../Store/session-slice";
import Spinner from "../Components/Spinner";


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error,loading} = useSelector((state)=>state.auth)
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleonSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const action = await dispatch(sigininUser(values));
      if (sigininUser.fulfilled.match(action)) {
        dispatch(sessionActions.sessionActive());
      }
    } catch (err) {
      setErrors({ submit: err.message || "Sigin failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container justify-center px-5 mx-auto flex flex-wrap items-center">
          <div class="lg:w-2/6 sm:w-2/4  lg:md-0 m-auto rounded-lg p-8 flex flex-col w-full ">
            <h2 class="text-gray-900 text-3xl font-bold font-primary text-center mb-5">
              Signin
            </h2>

            <Formik
              method="POST"
              initialValues={initialValues}
              onSubmit={handleonSubmit}
              validationSchema={validationSchema}
            >

              {({ isSubmitting }) => (
                <Form>
                    <div class="relative mb-4">
                      <label
                        for="email"
                        class="leading-7 text-md text-gray-600 font-bold"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        name="email"
                        class="w-full bg-gray-100 font-semibold rounded border-none placeholder-black  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    </div>


                    <div class="relative mb-4">
                      <label
                        for="password"
                        class="leading-7 text-md text-gray-600 font-bold"
                      >
                        Passoword
                      </label>
                      <Field
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        name="password"
                        class="w-full bg-gray-100 font-semibold rounded border-none placeholder-black  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                    </div>


                  <button type="submit" class="text-white font-semibold font-primary bg-softRed border-0 py-2 px-8 focus:outline-none w-full hover:bg-indigo-600 rounded text-lg">
                  {loading ? <Spinner styling={'w-10 h-10 fill-white-600  dark:text-gray-600'} /> : 'Sigin'}
                  </button>

                  <OAuth />
                </Form>
              )}

            </Formik>

            {error ? <p className="text-red-500 text-lg" >{error}</p> : null}

            <p className="mt-3  text-black me-1">
              Dont have an Account{" "}
              <Link class="text-blue-500" to="/signup">
                Signin
              </Link>
            </p>
          </div>
        </div>
      </section>


    </>
  );
};

export default SignIn;
