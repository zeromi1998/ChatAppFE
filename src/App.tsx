import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/Singup";
import UsersPage from "./Users/User";
import ChatPage from "./Chat/Chat";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
function App() {
  const isLoggedIn: boolean =
    JSON.parse(localStorage.getItem("userData")!) !== null;
  // const localStorageValue = localStorage.getItem("userData");
  // const userData = JSON.parse(localStorageValue!);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/singup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <PrivateRoute>
                {" "}
                <ChatPage />{" "}
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
