import "./welcome.scss";


function Welcome({currentUser}){

    


    return(<>
       
    { currentUser && <div className="mainwelcome">


           
           <img src="robot.gif" alt="robot" />

           <h1>Welcome ,<span>{currentUser.name}!</span></h1>

           <h3>Please select a chat to Start messaging.</h3>

       </div>}


    </>)


}


export default Welcome;