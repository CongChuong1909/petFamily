import  express  from "express";
const app = express();
import dotenv from "dotenv"; 
import userRoutes from "./Routes/users.js"
import postRoutes from "./Routes/posts.js"
import imageRoutes from "./Routes/image.js"
import likeRoutes from "./Routes/likes.js"
import commentRoutes from "./Routes/comments.js"
import authRoutes from "./Routes/auth.js"
import uploadRoutes from "./Routes/upload.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();
/// allow access cookie 
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
    origin:"http://127.0.0.1:5173"
}));

app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api", uploadRoutes);

app.listen(4000, ()=>{
    console.log("Api is running on port 4000!");
})