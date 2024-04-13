import userRoutes from "./users.js"
import postRoutes from "./posts.js"
import imageRoutes from "./image.js"
import likeRoutes from "./likes.js"
import petRouters from  "./Pets.js"
import commentRoutes from "./comments.js"
import uploadRoutes from "./upload.js"
import messagesRoutes from "./messages.js"
import relationShipRoutes from "./Relationships.js"
import ratingRoutes from "./rating.js"
import conversationRoutes from "./conversation.js"
import reportRoutes from "./reportcontents.js"
import veterinarianRoutes from './verterinarian.js'
import notificationRoutes from './notification.js'
import categoryRoutes from './categories.js'
import petDetailRoutes from './petDetails.js'
import shareRoutes from './shares.js'
import searchRoutes from './search.js'
import findPetRoutes from './findPet.js'
import authRoutes from "./auth.js"
export default function route(app) {
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
app.use("/api/findpet", findPetRoutes);
}