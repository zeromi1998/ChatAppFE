import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { _localhostUrl,prodUrl } from "../constant";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUserData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = false;
    setError({emailError:"",passwordError:""})
    if (!emailPattern.test(userData.email)) {
      isValid = true;
      setError((preVal) => {
        return {
          ...preVal,
          emailError: "Please enter valid email Id",
        };
      });
    }
    return isValid;
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (formValidation()) {
      return;
    }
    try {
      setError({emailError:"",passwordError:""})
      const userLogin = await axios.post(`${prodUrl}/login`, {
        emailId: userData.email,
        password: userData.password,
      });
      if (userLogin.data) {
        localStorage.setItem("userData", JSON.stringify(userLogin.data));
        navigate("/users");
      }
      
    } catch (error: any) {
      console.log("this is login error", error, error.response.data.message);
      if (error.response.data.message == "Incorrect Email") {
        setError((preVal) => {
          return {
            ...preVal,
            emailError: "That email is not register!",
          };
        });
      }
      if (error.response.data.message == "Incorrect Password") {
        setError((preVal) => {
          return {
            ...preVal,
            passwordError: "Passoword you enter is wrong!",
          };
        });
      }
      throw new Error(error);
    }
  };
  return (
    <div className="loginForm">
      <h2>WELCOME BACK!</h2>
      <p>Please enter your details.</p>
      <form onSubmit={submitForm}>
        <label>Email</label>
        <input
          className="login-input"
          type="email"
          required
          placeholder="Enter your email"
          onChange={handleChange}
          value={userData.email}
          name="email"
        />
        {error.emailError ? (
          <span className="errorClass">{error.emailError}</span>
        ) : (
          ""
        )}
        <label>Password</label>
        <input
          className="login-input"
          type="password"
          required
          placeholder="Enter your password"
          onChange={handleChange}
          value={userData.password}
          name="password"
        />
        {error.passwordError ? (
          <span className="errorClass">{error.passwordError}</span>
        ) : (
          ""
        )}
        <button className="login-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
