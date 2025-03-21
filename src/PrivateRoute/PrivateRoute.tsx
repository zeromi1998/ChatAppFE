import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const localStorageValue = localStorage.getItem("userData");
  const userData = JSON.parse(localStorageValue!);
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  let isAuthenticated = false;

  if (userData && userData.token) {
    isAuthenticated = true;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
