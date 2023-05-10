import"./App.scss";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import Login from "./pages/login/Login";
import Registor from "./pages/registor/Registor";
import Chat from "./pages/chat/Chat";
import { toast } from 'react-toastify';


function App() {
  toast.configure();

  return (
    <>
     <Router>
      
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registor" element={<Registor />}></Route>
        <Route path="/Chat" element={<Chat />}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
