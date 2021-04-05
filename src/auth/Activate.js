import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../core/Layout";

import axios from "axios";
import jwt from 'jsonwebtoken';
import "react-toastify/dist/ReactToastify.min.css";

const Activate = ({match}) => {
  const [values, setValues] = useState({
    name: "",
  
    token: "",
    show: "true",
  });

  useEffect(() => {
     let token = match.params.token
     let {name} = jwt.decode(token);
     console.log(token);
     if(token) {
         setValues({...values,name, token})
     }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();

    // post request to backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token},
      //   headers: { "Content-Type": "application" },
    }) 
      .then((response) => {
        console.log("Account Acctivation", response);
        //save the response {user, token } localstorage/cookie
        setValues({
          ...values,

    
          show: false,
        });
        toast.success(`Hey ${response.data.message} , Welcome Back!`);
      })
      .catch((error) => {
        console.log("Account Acctivation Error ", error.response.data.error);
      
        toast.error(error.response.data.error);
      });
  };
  const activationLink = () => {
    return (
      <div className='text-center'>
        {" "}
        <h1 className="p-5">
          Hey {name}, Ready to Activate Your Account
        </h1>
        <br />
       
        <button className="btn btn-outline-primary" onClick={clickSubmit}>
          Activate Your Account
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
     

        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
