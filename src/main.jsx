import React,{ useState }  from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import Context from './context_api/user_data_context.jsx'




const AppWrapper=()=>{

 
  const [userData,setuserData]=useState({});

  return(
    
    <Context.Provider value={{userData,setuserData}}>

    <App />
    </Context.Provider>
    
    
  )
}






ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AppWrapper />
  
)
