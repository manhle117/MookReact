import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./LoginStyle.css";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    password: "",
    fullName: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/users/addUser", register)
      .then((response) => {
        Swal.fire({
          title: "Tạo thành công",
          icon: "success",
        });
        navigate("/login");
        setRegister({
          username: "",
          password: "",
          fullName: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmitRegister}>
      <div className="container">
        <div className="card">
          <div className="form">
            <div className="left-side">
              <span></span> <span></span> <span></span> <span></span>
            </div>
            <div className="right-side">
              <div className="signup_form s_form ">
                <div className="login">
                  <h2>Create Account</h2>
                </div>
                <div className="input_text">
                  <input
                    type="text"
                    name="username"
                    value={register.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                  <i className="fa fa-user" />
                </div>

                <div className="input_text">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={register.password}
                    onChange={handleChange}
                    className="signup_pass"
                    placeholder="Password"
                    required
                  />
                  <i className="fa fa-lock" />
                  <i
                    className="fa fa-eye-slash signup_eye"
                    onClick={toggleShowPassword}
                  />
                </div>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="fullName"
                    name="fullName"
                    value={register.fullName}
                    onChange={handleChange}
                    required
                  />
                  <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div className="login_btn">
                  <button type="submit" className="signup_button">
                    Sign Up
                  </button>
                </div>
                <div className="create">
                  <p>
                    Already have an account?
                    <NavLink to="/login" className="login_acc">
                      Login <i className="fa fa-long-arrow-right" />
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
