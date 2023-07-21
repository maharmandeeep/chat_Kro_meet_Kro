import { useEffect, useState } from "react";
import "./contact.scss";

function Contacts({ contacts, currentUser,handlechangechat }) {
  const [currentName, setcurrentName] = useState(undefined);
  const [currentImage, setcurrentImage] = useState(undefined);
  const[currselected ,setcurrselected]=useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setcurrentName(currentUser.name);
      setcurrentImage(currentUser.avtarImage);
    }
  }, [currentUser]);

  function changechat(index,contact){
    setcurrselected(index);
    handlechangechat(contact);
  }

  return (
    currentName &&
    currentImage && contacts &&(
      <div className="maincontactsontainer">
        <div className="brand">
          <img src="logo1.png" alt="logo" />
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => (
            <div className={`contact ${(index===currselected)?" selected" :" "}`}  key={contact._id}  onClick={()=>changechat(index,contact)}>
              <div className="avtar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avtarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{contact.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="current_user">
            <div className="avtar">
            <img
                  src={`data:image/svg+xml;base64,${currentImage}`}
                  alt="avatar"
                />

            </div>
            <div className="username">
                <h2>{currentName}</h2>
            </div>

        </div>
      </div>
    )
  );
}   

export default Contacts;
