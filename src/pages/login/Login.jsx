import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { getmydata, loginroute } from "../../utils/API_routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastContainer } from "../registor/Registor"; 
import Context from "../../context_api/user_data_context";

function Login() {
  const navigate = useNavigate();
  //checking is we alredy logi or not

  //for refresh login page
  
 

  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (Validationlogin()) {
      try {
        const { name, password } = values;
        const { data } = await axios.post(
          loginroute,
          {
            name,
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

        if(data.status){

          localStorage.setItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY,JSON.stringify(data.user));

          navigate("/Chat")
        }
       
        
      } catch (error) {
        toast.error(error.response.data.msg, toastContainer);
      }
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const Validationlogin = () => {
    const { password, name } = values;

    if (password === "") {
      toast.error("Password is required.", toastContainer);
      return false;
    } else if (name.length == "") {
      toast.error("Username  is required.", toastContainer);
      return false;
    }

    return true;
  };

  //check we already login or not if the login we have cookie inn our authentication api

  const { setuserData, userData } = useContext(Context);


  useEffect(()=>{
    if (localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)) {
      navigate("/Chat");
    }
   
  },[])
 

  return (
    <>
      <div className="one">
        <div className="outercontainer">
          <form onSubmit={handleSubmit} className="formstyle">
            <span className="logo">
              <img src="logo1.png" alt="logo" />
            </span>

            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>

            <button type="submit">Login</button>

            <span className="last">
              already have an account ?<Link to="/registor"> registor</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
