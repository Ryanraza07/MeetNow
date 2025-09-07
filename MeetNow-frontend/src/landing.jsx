import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";


export default function Landingpage(){
    const navigate = useNavigate(); 

    return(
        <div>
        <div className="landingpagecontainer">
         <nav>
            <div className="navHeader">
            <h1> <span style={{color:"green"}}>Meet</span>Now</h1>
            </div>
            <div className="navlist"> 
                 <p onClick={() =>{
                   navigate("/shjfkd")
                 }}>Join as Guest</p>
                 <p onClick = {() => 
                    navigate("/auth")
                 }>Register</p>
                 <div role="button" onClick = {() => 
                    navigate("/auth")
                 }>Login
                 </div> 
            </div>
         </nav>


         <div className="landingMainContainer" > 
            <div>
            <h1><span style={{color:"green"}}>Meeting hai?</span> Online Karlo</h1>
            <p>Meet Professionally or Casually</p>
            <div className="buttonstart">
                <Link to={"/auth"}> Get Started</Link>
            </div>
            
            </div>
            <div role="button" >
             <img src="/Home-3boxes-CB-Video-call-min-1024x629-removebg-preview.png" alt="" />
            </div>
           
         </div>
         </div>


         

</div>
    )
}