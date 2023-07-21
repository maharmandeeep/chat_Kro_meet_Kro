import { useState } from "react";
import "./chatinput.scss";
import {BsEmojiSmileFill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import  Picker from 'emoji-picker-react';


function ChatInput({ handleSendMsg }){
  
   const [emojiShow,setemojiShow]=useState(false);
   const  [msg,setmsg]=useState("");

    const emojiShowHide=()=>{
       setemojiShow(!emojiShow);
    }


    const handleemojiClick=(emojiObject,event)=>{
       
        const emoji = emojiObject.emoji ;
    
        const newMsg = msg + emoji;
        
        setmsg(newMsg);

        setemojiShow(!emojiShow);
    }




    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setmsg("");
        }
      };

    return(
        <>
        <div className="allchatmain">
            <div className="button-emoji">
                <div className="emoji">
                <BsEmojiSmileFill  onClick={emojiShowHide}/>
                {emojiShow && <Picker onEmojiClick={handleemojiClick}/>}
                </div>
            </div>

            <form className="chat-input-secction"  onSubmit={(event) => sendChat(event)}>
                <input type="text" placeholder="type youe message" onChange={(e) => setmsg(e.target.value)} value={msg}  />
                <button className="submit">
                <IoMdSend />
                </button>
            </form>
        </div>
        
        </>
    )

}


export default ChatInput;