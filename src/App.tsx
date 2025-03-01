import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/Singup";
import UsersPage from "./Users/User";
import ChatPage from "./Chat/Chat";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SignUp />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
