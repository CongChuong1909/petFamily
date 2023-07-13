import  express  from "express";
// import io from 'socket.io'
import { Server } from 'socket.io';
import http from 'http';
import dotenv from "dotenv"; 
import userRoutes from "./Routes/users.js"
import postRoutes from "./Routes/posts.js"
import imageRoutes from "./Routes/image.js"
import likeRoutes from "./Routes/likes.js"
import petRouters from  "./Routes/Pets.js"
import commentRoutes from "./Routes/comments.js"
import authRoutes from "./Routes/auth.js"
import uploadRoutes from "./Routes/upload.js"
import messagesRoutes from "./Routes/messages.js"
import relationShipRoutes from "./Routes/Relationships.js"
import ratingRoutes from "./Routes/rating.js"
import conversationRoutes from "./Routes/conversation.js"
import reportRoutes from "./Routes/reportcontents.js"
import veterinarianRoutes from './Routes/verterinarian.js'
import notificationRoutes from './Routes/notification.js'
import categoryRoutes from './Routes/categories.js'
import petDetailRoutes from './Routes/petDetails.js'
import shareRoutes from './Routes/shares.js'
import searchRoutes from './Routes/search.js'
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import "./middlewares/passport.js";
import passport from "passport";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
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
    origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
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
            origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
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
    // console.log(`User connected with ID ${socket.id}`);
    // add new

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
app.use("/", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/pet", petRouters);
app.use("/api/relationships", relationShipRoutes);
app.use("/api", uploadRoutes);
app.use("/api/messages", messagesRoutes)
app.use("/api/conversations", conversationRoutes);
app.use("/api/veterinarian", veterinarianRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/petdetail", petDetailRoutes);



server.listen(4000, ()=>{
    console.log("Api is running on port 4000!");
})

