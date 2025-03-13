import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const UsersPage = () => {
  const [usersData, setUserData] = useState([]);
  const localStorageValue = localStorage.getItem("userData");
  const userData = JSON.parse(localStorageValue!);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await axios("http://localhost:8000/getUsers");
      console.log("this is get user data", users);
      if (users) {
        setUserData(users.data);
      }
    } catch (err: any) {
      console.log("this is get user api call", err);
      throw Error(err);
    }
  };

  const goToChatPage = (data: any) => {
    console.log("this is userdata", data);
    navigate(`/chat/${data._id}`, { state: data });
  };
  return (
    <div className="flexbox-container">
      {usersData.map((data: any) => {
        return (
          <>
            {data.emailId != userData.email ? (
              <div>
                <p>{data.name}</p>
                <button onClick={() => goToChatPage(data)}>Chat</button>
              </div>
            ) : (
              ""
            )}
          </>
        );
      })}
    </div>
  );
};

export default UsersPage;
