import { useEffect, useState } from "react";
import "./setAvatar.scss";
import axios from "axios";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { toastContainer } from "../../pages/registor/Registor";

function SetAvatar() {
  //this is random api
  

  const [loader, setLoader] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  const [profilepicture,setprofilepicture]=useState(undefined);



  function setprfileHandle(){

    if(selectedAvatar===(undefined)){
      toast.error("Please select the avatar first",toastContainer);
    }
  }




  useEffect(() => {
    async function fetchdata() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`https://api.multiavatar.com/${Math.round(Math.random()*100000)}?apikey=oImbfUZOqyXiWA`);
        const buffer = new Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setLoader(false);
    }

    fetchdata();
  }, []);

  console.log(avatars);

  return (
    <>
      {loader ? (
        <div className="loader">
          <img src="my_own.gif" alt="" />
        </div>
      ) : (
        <div className="allinonecontainer">
          <div className="titlecontainer">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>

          <div className="allavatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index ? " selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => {
                    setselectedAvatar(index);
                  }}
                />
              </div>
            ))}
          </div>

          <button className="buttontoadd" onClick={()=>{setprfileHandle()}}>Select your profile picture</button>
        </div>
      )}
    </>
  );
}

export default SetAvatar;
