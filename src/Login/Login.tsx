import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
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

  const submitForm = async(e: any) => {
    e.preventDefault();
    console.log("this is userData", userData);
    try {
    const userLogin  = await axios.post("http://localhost:8000/login",{ 
      emailId:userData.email,
      password:userData.password
    })
    if(userLogin.data){
      localStorage.setItem("userData", JSON.stringify(userLogin.data));
      navigate("/users")
    }
    console.log("this is ogin data",userLogin);

    } catch (error:any) {
      console.log("this is login error",error)
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
        <button className="login-button" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
