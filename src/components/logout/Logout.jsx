import { useNavigate } from "react-router-dom";
import "./logout.scss"
import { BiPowerOff } from 'react-icons/bi';
import axios from "axios";
import { logoutroute } from "../../utils/API_routes";
import { toastContainer } from "../../pages/registor/Registor";
import { toast } from "react-toastify";

function Logout(){
    const navigate = useNavigate(); 
    
    async function  logoutHnadle(){
       try {
        console.log("logout");
        const data= await axios.get(logoutroute,{
          withCredentials :true,
        });
        
        console.log(data)
        if (data.data.success === "true") {
            localStorage.clear();
            navigate("/login");
            console.log("logout2");
            toast.success(data.data.msg,toastContainer);
          }

       } catch (error) {
        
        
         toast.error(error.response.data.msg,toastContainer);
       }
    }

    return (
        <div className="button" onClick={logoutHnadle}>
           <BiPowerOff />
        </div>
    )
}

export default Logout;