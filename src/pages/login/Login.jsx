import { Link } from "react-router-dom";
import "./login.scss";
import { useState } from "react";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    alert("form");

    console.log(values);
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
              type="email"
              placeholder="Email"
              name="email"
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
