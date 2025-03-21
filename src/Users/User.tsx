import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { localhostUrl, prodUrl } from "../constant";
import defaultIMg from "../assets/user.jpg";
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
      const users = await axios(`${prodUrl}/getUsers`);
      if (users) {
        setUserData(users.data);
      }
    } catch (err: any) {
      console.log("this is get user api call", err);
      throw Error(err);
    }
  };

  const goToChatPage = (data: any) => {
    navigate(`/chat/${data._id}`, { state: data });
  };
  return (
    <div className="flexbox-container">
      {usersData.map((data: any) => {
        return (
          <>
            {data.emailId != userData.email ? (
              <div>
                <div className="childDivImg">
                  <img src={defaultIMg} alt="defaultImg" />
                </div>
                <div className="childDiv">
                  <p>{data.name}</p>
                  <button onClick={() => goToChatPage(data)}>Chat</button>
                </div>
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
