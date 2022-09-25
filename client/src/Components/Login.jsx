import React from "react";
import loginImg from "../image/login-img.png";
import {useNavigate} from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'

const initialValues = {
  name: "",
  email: "",
  mobileNo: "",
};

const LoginSchema = Yup.object({
  name: Yup.string().required("Name required !"),
  email: Yup.string()
    .email("Invalide email Formate")
    .required("Email Requried !"),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter Valid Mobile Number")
    .required("Mobile Number Required"),
});

const Login = () => {
  
    const navigate = useNavigate()

  const handleSubmit = async(value) => {
       const url="http://localhost:8080/user"
        const responce = await axios.post(url,value)
        localStorage.setItem("user",responce.data.name)
        localStorage.setItem("Id",responce.data._id)
        console.log(responce)
        navigate("/home")
        window.location.reload()
  };



  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">
                        Please login to your account
                      </h4>
                    </div>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={LoginSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className="form-outline mb-4">
                          <label className="form-label">Name</label>
                          <Field
                            type="text"
                            id="form2Example11"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                          />
                          <div className="error">
                          <ErrorMessage name="name"/>

                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label">Email</label>
                          <Field
                            type="text"
                            id="form2Example22"
                            name='email'
                            className="form-control"
                            placeholder="email address"
                          />
                          
                          <div className="error">
                          <ErrorMessage name="email"/>

                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label">Mobile Number</label>
                          <Field
                            type="text"
                            id="form2Example22"
                            name="mobileNo"
                            className="form-control"
                            placeholder="Mobile number"
                          />
                          <div className="error">
                          <ErrorMessage name="mobileNo"/>

                          </div>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="form-control btn btn-primary"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <img
                      src={loginImg}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
