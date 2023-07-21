import { useContext, useEffect, useRef, useState } from "react";
import Context from "../../context_api/user_data_context";
import "./chat.scss";
import { useNavigate } from "react-router-dom";
import { allUserslist, host } from "../../utils/API_routes";
import axios from "axios";
import Contacts from "../../components/contacts/Contacts";
import Welcome from "../../components/welcome/Welcome";
import Chatcontainer from "../../components/chatContainer/Chatcontainer";
import { io } from "socket.io-client";




function Chat(){
//    const{userData,setuserData}=useContext(Context);

    const navigate=useNavigate();
    const socket = useRef();
   

    const [currentUser,setCurrentUser]=useState(undefined);
    const [contacts,setContacts]=useState(undefined);
    const [changechatwith,setchangechatwith]=useState(undefined);


//ckecking if teir is not login info in local strage it naviagte to lognn page if not then save data 

console.log(currentUser);

   useEffect( () => {

    async function dowork(){
        if (!localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
          } else {
            setCurrentUser(
              await JSON.parse(
                localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)
              )
            );
          }

    }

    dowork();
   
  }, []);



  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  //this use effect work onn if avatr is not set then it will redirect to avatr page to set it first and then feext
  //  all the user from our databse we will refind and add other thing later on

  useEffect(() => {
  
    async function checkAvatar(){
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
              const data = await axios.get(`${allUserslist}/${currentUser._id}`);
              setContacts(data.data);
            } else {
              navigate("/setAvatar");
            }
          }

    }

    checkAvatar();
 
  }, [currentUser]);

  
  console.log(contacts);
  console.log(changechatwith);


  // this function is select currcct frient chat container
  const handlechangechat=(contact)=>{
    setchangechatwith(contact)
  }
   

   

    return( 

        
        <div className="chatmain">

            <div className="contactcontainer">
            <Contacts contacts={contacts} currentUser={currentUser} handlechangechat={handlechangechat}/>

            </div>
            <div className="chatcontainer">
              {

            changechatwith ===undefined?
              <Welcome currentUser={currentUser}/>:
              <Chatcontainer changechatwith={changechatwith} currentUser={currentUser} socket={socket }/>
              }
           

            </div>
        </div>
       
    )
}


export default Chat;