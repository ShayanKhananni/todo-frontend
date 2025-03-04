import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCameraRotate } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateUserMutation } from "../Store/auth-api-slice";
import Spinner from "../Components/Spinner";
import { authActions } from "../Store/auth-slice";

const Profile = () => {


  const { _id, username, photoURL } = useSelector((state) => state.auth.user);

  
  const dispatch = useDispatch();
  const [imgState, setImgState] = useState(null);
  const [updateUser,{isLoading}] = useUpdateUserMutation()


  const profileFormValues = {
    username: username || "",
    image: null || photoURL,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImgState(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };


  const handleProfile = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("_id", _id);

    if (values.image && values.image !== profileFormValues.image) {
      formData.append("image", values.image);
    }

    Object.keys(values).forEach((key) => {
      if (key !== "image" && values[key] !== profileFormValues[key]) {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await updateUser(formData).unwrap(); 
      toast.success(response.message);
      dispatch(authActions.updateUser(response.updatedUser)); 
    } catch (err) {
      toast.error(err?.data?.message || "Failed to Update Profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={profileFormValues}
        validationSchema={validationSchema}
        onSubmit={handleProfile}
        enableReinitialize={true}
      >
        {({ setFieldValue, isSubmitting, dirty }) => (
          <Form className="max-w-md mt-10 mx-auto p-6 shadow-customPositive bg-white rounded-lg">
            <h1 className="text-center text-2xl font-bold mb-4">Profile</h1>

            <div className="relative w-20 h-20 mx-auto">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-black hover:bg-green-600 cursor-pointer rounded-full flex items-center justify-center"
                onClick={handleButtonClick}
              >
                <FaCameraRotate className="text-white w-4 h-4" />
              </div>

              <img
                src={imgState || photoURL || "https://via.placeholder.com/80"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />

              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />
            </div>

            <h3 className="text-center font-bold my-2">Profile Picture</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <Field
                type="text"
                name="username"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!dirty || isSubmitting}
              className={`${
                dirty ? "bg-green-700" : "bg-gray-500"
              } text-lg w-full rounded-sm block mx-auto my-3 text-white p-2 font-semibold`}
            >
              {isLoading ? <Spinner/> : "Update Profile"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
