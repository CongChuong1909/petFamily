import  Express  from "express";
import { login, loginMethodFail, loginMethodSuccess, logout, logoutMethod, register } from "../Controller/auth.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const router = Express.Router();
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/register", register);
router.get("/auth/loginMethod/success", loginMethodSuccess);
router.get("/auth/loginMethod/failed", loginMethodFail);
router.get("/auth/logoutMethod", logoutMethod);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/auth/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/loginMethod/failed",
    })
  );
  
export default router