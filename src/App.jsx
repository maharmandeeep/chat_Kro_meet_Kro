import"./App.scss";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import Login from "./pages/login/Login";
import Registor from "./pages/registor/Registor";
import Chat from "./pages/chat/Chat";
import { toast } from 'react-toastify';
import SetAvatar from "./components/setAvatar/SetAvatar";
import Context from "./context_api/user_data_context";
import { useContext, useEffect } from "react";
import { getmydata } from "./utils/API_routes";
import axios from "axios";


function App() {
  toast.configure();

  const { setuserData, userData } = useContext(Context);
  
  useEffect(()=>{
    axios.get(getmydata,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res)=>{
      localStorage.setItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY,JSON.stringify(res.data.user));

    }).catch((e)=>{
      // console.log(e);
      
    })
  },[])

  


  return (
    <>
     <Router>
      
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registor" element={<Registor />}></Route>
        <Route path="/Chat" element={<Chat />}></Route>
        <Route path="/setAvatar" element={<SetAvatar />}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
