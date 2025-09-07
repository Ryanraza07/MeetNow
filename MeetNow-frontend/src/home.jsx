import React, { useContext, useState } from "react";
import withAuth from "./utls/withAuth";
import { useNavigate } from "react-router-dom";
import './index.css';
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from "./context/AuthContext";

 function HomeComponent(){

    let navigate = useNavigate();
    let [meetingCode,setMeetingCode] = useState("");
    const {addToUserHistory} = useContext(AuthContext);
    
    let handleVideoCall = async () => {
        try {
            if (!meetingCode) {
                alert("Please enter a meeting code");
                return;
            }
            
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (error) {
            console.error("Video call error:", error);
            alert("Failed to join meeting");
        }
    }

    return(<>
        <div className="navBar">
           <div style={{display:"flex", alignItems:"center" ,}}>
            <h2>MeetNow</h2>
           </div>
           <div style={{display:"flex" , alignItems:"center"}}>
              <IconButton onClick={
                () =>{
                  navigate("/history")
                }
              }>
                <RestoreIcon />
               
              </IconButton>
               <p>History </p>
              <button onClick = {() =>{
                localStorage.removeItem('token')
                navigate('/auth')
              }} >
                Logout
              </button>
           </div>
        </div>

        <div className="meetContainer"> 
          <div className="leftPanel">
            <div>
                <h2>
                    High Quality Meetings Instantly
                </h2>
               
                <div style={{display:"flex", gap:"10px"}}>
                    <TextField onChange={e => setMeetingCode(e.target.value)} id="otlined-basic" label= "Meeting code" variant="outlined"/>
                    <Button onClick= {handleVideoCall} variant = "contained">Join</Button>
                </div>
           </div>
           
          </div>
           <div className="rightPanel">
                <img src="/undraw_group-video_k4jx.png" alt=""/>
            </div>
        </div>
        </>
    )

}
export default withAuth(HomeComponent)