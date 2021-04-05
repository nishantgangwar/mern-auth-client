import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });

    // post request to backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
      //   headers: { "Content-Type": "application" },
    })
      .then((response) => {
        console.log("Signup Success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Signup Error ", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const SignupForm = () => (
    <form>
      <div className="form-group">
        <lable className="text-muted">Name</lable>
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
        
          className="form-control"
        />{" "}
      </div>
      <div className="form-group">
        <lable className="text-muted">Email</lable>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />{" "}
      </div>
      <div className="form-group">
        <lable className="text-muted">Password</lable>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-control"
        />{" "}
      </div>

      <div>
        {" "}
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {JSON.stringify({ name, email, password })}
        <h1 className="p-5 text-center">Signup</h1>
        {SignupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
