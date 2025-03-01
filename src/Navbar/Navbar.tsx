import { Link } from "react-router-dom";
import "./styles.css"
const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/singup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
