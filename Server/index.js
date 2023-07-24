import  express  from "express";
// import io from 'socket.io'
import { Server } from 'socket.io';
import http from 'http';
import dotenv from "dotenv"; 
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import "./middlewares/passport.js";
import passport from "passport";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import route from "./Routes/index.routes.js";
const app = express();
app.use( bodyParser.urlencoded({ extended: true }) )
dotenv.config();
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})


app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true , limit: '50mb'}))
app.use(express.json());
/// only use api
app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
  app.use(
    cookieSession({ name: "session", keys: ["190901"], maxAge: 24 * 60 * 60 * 100 })
  );
  app.use(passport.initialize());
  app.use(passport.session());

    const server = http.createServer(app);
    const socketServer = new Server(server , {
        cors: {
            origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://localhost:5173", "http://localhost:5174"],
        }
    });
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

socketServer.on('connection', (socket) => {
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            socketServer.emit("getUsers", users);
          });
        
        //   Send and receive messages
          socket.on("sendMessage", ({ senderId, receiverId, textcontent }) => {
            socketServer.to(`${receiverId.socketId}`).emit("getMessages", {
                senderId,
                textcontent,
            });
          });
        
          // When disconnected
          socket.on("disconnect", () => {
            console.log("A user disconnected!");
            removeUser(socket.id);
            socketServer.emit("getUsers", users);
          });
});

app.use(cookieParser());
route(app);


server.listen(4000, ()=>{
    console.log("Api is running on port 4000!");
})

