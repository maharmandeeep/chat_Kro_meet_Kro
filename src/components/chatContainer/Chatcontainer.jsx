import axios from "axios";
import ChatInput from "../chatInput/ChatInput";
import Logout from "../logout/Logout";
import "./chatcontainer.scss";
import { getAllMessageRoute, sendMessgaeRoute } from "../../utils/API_routes";
import { useEffect, useRef, useState } from "react";

function Chatcontainer({ changechatwith, currentUser ,socket}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {


    async function getmymsg() {

      if(changechatwith){
      
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: changechatwith._id,
      });
      setMessages(response.data);
    
    }
  }

    getmymsg();
}, [changechatwith]);

  




  async function handleSendMsg(msg) {

    
    

    await axios.post(sendMessgaeRoute, {
      from: currentUser._id,
      to: changechatwith._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: changechatwith._id,
      from: currentUser._id,
      msg,
    });


    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }

  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
      <div className="mainall">
        {/* top section of chat conntainer */}
        <div className="chat-header">
          <div className="user_detail">
            <div className="avtar">
              <img
                src={`data:image/svg+xml;base64,${changechatwith.avtarImage}`}
                alt="avtar"
              />
            </div>
            <div className="username">
              <h3>{changechatwith.name}</h3>
            </div>
          </div>

          <Logout />
        </div>

        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div >
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </>
  );
}

export default Chatcontainer;
