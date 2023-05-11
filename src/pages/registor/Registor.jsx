import { Link, Navigate, useNavigate } from "react-router-dom";
import "./registor.scss";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { registorroute } from "../../utils/API_routes";

//toat property
export const toastContainer = {
  position: "bottom-right",
  autoClose: 7000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

function Registor() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    //calling the function for form valudation   and is it will return true we will call our api
    if (handleValidation()) {
      try {
        const { name, email, password } = values;

        const { data } = await axios.post(
          registorroute,
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        toast.success(data.msg, toastContainer);
        //after succeful regitor it will redirect to chatpage
        if(data.status){
         navigate("/Chat");
        }
       
      } catch (error) {
        toast.error(error.response.data.msg, toastContainer);
      }
    }

    // after sunmitting the form this will make a form clear
    
    setValues({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //function for validation is our form is valid to go registor or not
  const handleValidation = () => {
    const { password, name, email, confirmpassword } = values;

    if (password !== confirmpassword) {
      toast.error(
        "Password and confirm password should  be same",
        toastContainer
      );
      return false;
    } else if (name.length < 3) {
      toast.error(
        "Username should be greater then 3 characters",
        toastContainer
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater then 8 characters",
        toastContainer
      );
      return false;
    } else if (email === "") {
      toast.error("email is required", toastContainer);
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="one">
        <div className="outercontainer">
          <form onSubmit={handleSubmit} className="formstyle">
            <span className="logo">
              <img src="logo1.png" alt="logo" />
            </span>
            <input
              value={values.name}
              type="text"
              placeholder="Username"
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <input
              value={values.email}
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>

            <input
              value={values.password}
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <input
              value={values.confirmpassword}
              type="password"
              placeholder="Confirm password"
              name="confirmpassword"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <button type="submit">Create User</button>

            <span className="last">
              already have an account ?<Link to="/login"> Login</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registor;
