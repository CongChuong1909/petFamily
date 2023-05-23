import  Express  from "express";
import { login, loginMethodFail, loginMethodSuccess, logout, logoutMethod, register } from "../Controller/auth.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const router = Express.Router();
console.log(process.env.CLIENT_URL);
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/loginMethod/success", loginMethodSuccess);
router.get("/loginMethod/failed", loginMethodFail);
router.get("/logoutMethod", logoutMethod);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/loginMethod/failed",
    })
  );
  
export default router