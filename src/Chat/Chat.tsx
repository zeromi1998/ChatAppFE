import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { _localhostUrl, prodUrl } from "../constant";
import CircularProgress from "@mui/material/CircularProgress";
const ChatPage = (props: any) => {
  // const {state} =  props.location;
  const location = useLocation();
  const state = location.state;
  const socketRef: any = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [messagesList, setMessagesList] = useState<any[]>([]);

  // const socket = io("http://localhost:8000");
  const [message, setMessage] = useState("");
  const localStorageValue = localStorage.getItem("userData");
  const userData = JSON.parse(localStorageValue!);
  useEffect(() => {
    // Prevent multiple connections
    if (!socketRef.current) {
      socketRef.current = io(prodUrl);

      socketRef.current.emit("register", userData?.email);
      setShowLoader(true);
      //   socketRef.current.on("connect", () => {
      //     console.log("Fetching messages for:", state.emailId);
      //     socketRef.current.emit("fetchMessages", state.emailId);
      // });

      // Listen for message history
      socketRef.current.once("messageHistory", (data: any) => {
        setMessagesList(data.messages);
        setShowLoader(false);
      });

      if (state?.emailId) {
        // console.log("Fetching messages for:", state.emailId);

        // Emit event to request messages for the selected chat
        socketRef.current.emit("fetchMessages", state.emailId);

        socketRef.current.on("message", (data: any) => {
          setMessagesList((preVal) => {
            return [
              ...preVal,
              { senderEmail: data.from, message: data.message },
            ];
          });
        });


      }

      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleMessage = (e: any) => {
    const val = e.target.value;
    setMessage(val);
  };

  const formatChatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const sendMessage = () => {
    if (!socketRef.current) {
      console.error("Socket not connected");
      return;
    }
    socketRef.current.emit("sendMessage", {
      receiverEmail: state.emailId,
      message,
    }); //

    setMessagesList((preVal) => {
      return [
        ...preVal,
        {
          senderEmail: userData.email,
          receiverEmail: state.emailId,
          message,
        },
      ];
    });
    setMessage("");
  };
  return (
    <div className="chat-container">
      <h2 className="heading-h2">{state.name}</h2>
      {showLoader ? (
        <div className="message-container-loader">
          <CircularProgress className="CircularProgress" />
        </div>
      ) : (
        <div className="message-container">
          {messagesList?.map((data: any, index: any) => {
            const isSender = data.senderEmail == userData.email;
            return (
              <>
                <p
                  key={index}
                  className={`message ${isSender ? "sent" : "received"}`}
                >
                  <span className="message-text">
                    {/* {data.senderEmail} : */}
                    {data.message}
                  </span>
                  <span className="timeStamp">
                    {formatChatTime(
                      data.timestamp ? data.timestamp : Date.now()
                    )}
                  </span>
                </p>
              </>
            );
          })}
        </div>
      )}

      <div className="input-container">
        <input
          name="message"
          value={message}
          onChange={handleMessage}
          className="input-message"
          type="text"
          placeholder="Type your message ...."
        />

        <button onClick={sendMessage} className="button-div">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
