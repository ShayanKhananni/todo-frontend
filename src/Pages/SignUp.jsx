import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../Services/auth-services';
import Spinner from '../Components/Spinner';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, loading} = useSelector((state)=>state.auth);
  


  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be eight characters long').required('Password is required'),
  });

  const handleonSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const action = await dispatch(signupUser(values));
      if(action.type.includes('fulfilled'))
      {
        navigate('/signin')
      }

    } catch (err) {
      setErrors({ submit: err.message || 'Signup failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container justify-center px-5 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 sm:w-2/4 lg:md-0 m-auto rounded-lg p-8 flex flex-col w-full ">
          <h2 className="text-gray-900 text-3xl font-bold font-primary text-center mb-5">Sign up</h2>

          <Formik
            method="POST"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleonSubmit}
          >

            {({ isSubmitting }) => (
              <Form>
                <div className="relative mb-4">
                  <label htmlFor="username" className="leading-7 text-md text-gray-600 font-bold">Username</label>
                  <Field type="text" id="username" placeholder="Enter Username" name="username" className="w-full bg-gray-100 font-semibold rounded border-none placeholder-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
                </div>

                <div className="relative mb-4">
                  <label htmlFor="email" className="leading-7 text-md text-gray-600 font-bold">Email</label>
                  <Field type="email" id="email" placeholder="Enter Email" name="email" className="w-full bg-gray-100 font-semibold rounded border-none placeholder-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </div>

                <div className="relative mb-4">
                  <label htmlFor="password" className="leading-7 text-md text-gray-600 font-bold">Password</label>
                  <Field type="password" id="password" placeholder="Enter Password" name="password" className="w-full bg-gray-100 font-semibold rounded border-none placeholder-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                </div>

                <button type="submit" disabled={isSubmitting} className="text-white w-full font-semibold font-primary bg-softRed border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{loading ? <Spinner styling={'w-10 h-10 fill-white-600  dark:text-gray-600'} /> : 'Signup'}</button>

                <p className='text-red-500 font-bold'>{error ? error : null}</p>

                <OAuth />


              </Form>
            )}
          </Formik>

          <p className='mt-3 text-black me-1'>Already have an Account <Link className="text-blue-500" to="/signin">Signin</Link></p>
          
        </div>
      </div>
    </section>
  );
};

export default SignUp;
