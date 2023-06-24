import  Express  from "express";
import { addService, getList, getServiceByID, getVeterinarianById, register } from "../Controller/verterinarian.js";
const router = Express.Router();


router.get("/getList", getList)
router.post("/register", register)
router.get("/getById", getVeterinarianById)
router.get("/getServiceByID", getServiceByID)
router.post("/addService", addService)

export default router