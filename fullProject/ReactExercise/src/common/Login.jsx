import axios from "axios";
import React, { useState } from "react";
import "./LoginStyle.css";
import { NavLink, useNavigate } from "react-router-dom";
export default function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/users/login", user)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userId", response.data);
        props.setIsLogin(true);
        props.getCarts();
        navigate("/");
      })
      .catch((error) => {
        window.alert("fail");
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container ">
        <div className="card">
          <div className="form">
            <div className="left-side">
              <span></span> <span></span> <span></span> <span></span>
            </div>
            <div className="right-side">
              <div className="signin_form s_form ">
                <div className="login">
                  <h2>User Login</h2>
                </div>
                <div className="input_text">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                  />
                  <i className="fa fa-user" />
                </div>
                <div className="input_text">
                  <input
                    className="signin_pass"
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <i className="fa fa-lock" /> <i className="fa fa-eye-slash" />
                </div>
                <div className="login_btn">
                  <button className="login_button">LOGIN</button>
                </div>
                <div className="forgot">
                  <p>
                    Forgot <a href="#">Username</a> <a href="#">Password</a> ?
                  </p>
                </div>
                <div className="create margin">
                  <NavLink to="/register" className="create_acc">
                    Create your Account
                    <i className="fa fa-long-arrow-right" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
