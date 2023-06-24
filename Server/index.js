import  express  from "express";
const app = express();

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
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import "./middlewares/passport.js";
import passport from "passport";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
app.use( bodyParser.urlencoded({ extended: true }) )

dotenv.config();
/// allow access cookie 
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

//


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

    ////

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


app.listen(4000, ()=>{
    console.log("Api is running on port 4000!");
})

