import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketmanager.js";
import userRoutes from "./routes/users.routes.js";


const app= express();
const server = createServer(app);
const io = new Server(server);


app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);

connectToSocket(server);

const start = async() =>{
    const connectionDb = await mongoose.connect("mongodb+srv://raazaltaf009:JpeoJPhDTadftBQM@cluster0.e80olyn.mongodb.net/")
    console.log(`mongodb connected DB Host: ${connectionDb.connection.host}`)
    server.listen(app.get("port"),() =>{
        console.log("listening on port 8000")
    });
    
};start();

