import { useState } from "react";
import axios from "axios";
import "./styles.css";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { _localhostUrl, prodUrl } from "../constant";
const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "1px  white",
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [openModel, setOpenModel] = useState(false);

  const [error, setError] = useState({
    formError: "",
    emailError: "",
    passwordError: "",
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
    // console.log("this is new rgister user", "formvalidtion");

    if (!emailPattern.test(userData.email)) {
      isValid = true;
      setError((preVal) => {
        return {
          ...preVal,
          emailError: "Please enter valid email Id",
        };
      });
    }
    if (userData.password.length < 6) {
      isValid = true;
      setError((preVal) => {
        return {
          ...preVal,
          passwordError: "Please enter password of size greater than 6",
        };
      });
    }

    return isValid;
  };

  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // return emailPattern.test(email);

  const handleClose = (_e: any, reason?: string) => {
    if (reason && reason === "backdropClick") {
      return; // Prevent closing when clicking outside
    }
    setOpenModel(false);
    navigate("/login");
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    if (formValidation()) {
      return;
    }
    try {
      const registerUser = await axios.post(`${prodUrl}/signUp`, {
        emailId: userData.email,
        name: userData.name,
        password: userData.password,
      });

      if (registerUser) {
        setOpenModel(true);
      }
    } catch (error: any) {
      console.log("this is sign up error", error.response.data.message);
      setError((preVal) => {
        return {
          ...preVal,
          formError: error.response.data.message,
        };
      });
      throw new Error(error);
    }
  };

  return (
    <>
      <Modal
        open={openModel}
        onClose={(e, reason) => handleClose(e, reason)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <p className="modalP" id="child-modal-title">
            You have successfully register...!
          </p>
          <Button className="modalBox" onClick={handleClose}>
            Ok
          </Button>
        </Box>
      </Modal>
      <div className="signUpForm">
        <h2>Let's create an account</h2>
        <span className="errorClass">
          {error.formError ? error.formError : ""}
        </span>
        <form onSubmit={submitForm}>
          <label>Your Name</label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            value={userData.name}
            required
          />
          <label>Email</label>
          <input
            className="signup-input"
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={userData.email}
            required
          />
          <span className="errorClass">
            {error.emailError ? error.emailError : ""}
          </span>
          <label>Password</label>
          <input
            className="signup-input"
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={userData.password}
            required
          />
          <span className="errorClass">
            {error.passwordError ? error.passwordError : ""}
          </span>
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
