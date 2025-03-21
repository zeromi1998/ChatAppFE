import "./styles.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const localStorageValue = localStorage.getItem("userData");
  const userData = JSON.parse(localStorageValue!);
  const navigateUser = () => {
    if (userData) {
      navigate("/users");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <section className="main-section">
        <div className="header-div">
          <h2>__Hey,Let's Chat___</h2>
          <h3>__Create your Account and Chat with your new friends__</h3>
          <button onClick={navigateUser}>Lets,Start here..</button>
        </div>
      </section>
    </>
  );
};

export default Home;
