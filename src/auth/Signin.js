import React ,{useState} from 'react'
import { ToastContainer , toast} from 'react-toastify'
import Layout from '../core/Layout'
import axios from 'axios';
import "react-toastify/dist/ReactToastify.min.css";

const Signin = () => {
    const [values, setValues] = useState({
     
        email: "",
        password: "",
        buttonText: "Submit",
      });
    
      const {  email, password, buttonText } = values;
     
      const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
      };
      const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: "Submitting" });
    
        // post request to backend
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API}/signin`,
          data: {  email, password },
          //   headers: { "Content-Type": "application" },
        })
          .then((response) => {
            console.log("Signin Success", response);
            //save the response {user, token } localstorage/cookie
            setValues({
              ...values,
              
              email: "",
              password: "",
              buttonText: "Submitted",
            });
            toast.success(`Hey ${response.data.user.name} , Welcome Back!`);
          })
          .catch((error) => {
            console.log("Signin Error ", error.response.data);
            setValues({ ...values, buttonText: "Submit" });
            toast.error(error.response.data.error);
          });
      };

    const SigninForm = () => (
        <form>
         
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
    return(
        <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {JSON.stringify({ email, password })}
        <h1 className="p-5 text-center">SignIn</h1>
        {SigninForm()}
      </div>
    </Layout>
    )
} 

export default Signin;