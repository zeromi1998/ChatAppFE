import { useState } from "react";
import axios from "axios";
import "./styles.css";

const SignUp = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
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

  const submitForm = async (e: any) => {
    e.preventDefault();
    console.log("this is sign up form", userData);
    try {
      const registerUser = await axios.post("http://localhost:8000/signUp", {
        emailId: userData.email,
        name: userData.name,
        password: userData.password,
      });
      console.log("this is new rgister user", registerUser);
    } catch (error: any) {
      console.log("this is sign up error", error);
      throw new Error(error);
    }
  };

  return (
    <div className="signUpForm">
      <h2>Let's create an account</h2>
      <form onSubmit={submitForm}>
        <label>Your Name</label>
        <input
        className="signup-input"
          type="text"
          placeholder="Enter your name"
          name="name"
          onChange={handleChange}
          value={userData.name}
        />
        <label>Email</label>
        <input
        className="signup-input"
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
          value={userData.email}
        />
        <label>Password</label>
        <input
        className="signup-input"
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
          value={userData.password}
        />
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
