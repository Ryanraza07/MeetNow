import { createContext, useState } from "react";
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from "react-router-dom";


export  const AuthContext = createContext({
    getHistoryOfUser: () => {},
});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const router = useNavigate();

    const handleRegister = async(fullname,username,password) => {
        try {
            let request = await client.post('/register',{
            name:fullname,
            username:username,
            password : password
            })
            if(request.status===HttpStatusCode.Created){
                return request.data.message;
            }
        } catch (error) {
            throw error;
        }
    }
    


    const handleLogin = async(username, password) => {
        if (!username || !password) {
            throw new Error("Username and password are required");
        }
        try {
            let request = await client.post('/login', {
                username,
                password
            });
            if (request.status === HttpStatusCode.Ok) {
                localStorage.setItem('token', request.data.token);
                router('/home');
            }
            return request.data;
        } catch (error) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    }


    const getHistoryOfUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            let request = await client.get("/get_all_activity", {
                params: { token }  
            });
            
            console.log('History response:', request.data); 
            return request.data;

        } catch (error) {
            console.error('Get history error:', error);
            throw error;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !meetingCode) {
                throw new Error("Token or meeting code missing");
            }
            
            const response = await client.post("/add_to_activity", {
                token,
                meetingCode  
            });
            
            return response.data;
        } catch (error) {
            console.error("Add to history error:", error);
            throw error;
        }
    }
   

    const data= {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        addToUserHistory,
        getHistoryOfUser

    }

    return(
        <AuthContext.Provider value = {data}>
            {children}
        </AuthContext.Provider>
    )

}