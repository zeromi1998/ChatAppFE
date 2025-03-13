import { Link } from "react-router-dom";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const localStorageValue = localStorage.getItem("userData");
  const userData = JSON.parse(localStorageValue!);

  const logoutUser = ()=>{
    localStorage.clear()
    navigate("/")
  }
  return (
    <header>
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          {userData ? (
            <>
              <li>
                <Link to="/users">Chat with Users</Link>
              </li>
              <li>
                <Link to="/" onClick={logoutUser}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/singup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
