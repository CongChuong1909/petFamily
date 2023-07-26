import { db } from "../connectbd.js";
import bcrypt from "bcryptjs"
import moment from "moment/moment.js";
import { nanoid } from 'nanoid';
import dotenv from "dotenv";
dotenv.config();
import jwt  from "jsonwebtoken";
import crypto from "crypto"
import { resetPassVerificationEmail, sendVerificationEmail } from "../utils/sendVerificationEmail.js";
export const register = (req, res) =>{
    //check user exists
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [req.body.email], (err, data)=>{
        if(err)
           {    return res.status(500).json(err);   }
        if(data.length>0)
            {   return res.status(409).json('User already exists!');    }
        //create new user
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const id = nanoid(10);
        const query = "INSERT INTO users (`idUser`, `email`,`password`,`name`,`avatar`, `status`, `role`, `date_create`, `address`, `phoneNumber`, `refreshToken`, `emailToken`, `isVerify`) VALUES (?)"
        const emailToken = crypto.randomBytes(64).toString("hex");
        const values = [
            id,
            req.body.email,
            hashedPassword,
            req.body.name,
            "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
            1,
            1,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            null,
            null,
            null,
            emailToken,
            0
        ]

       
        db.query(query,[values], (err ,data)=>{
            if(err)
           {    return res.status(500).json(err);   }
           sendVerificationEmail(req.body.name,req.body.email,emailToken)
           return res.status(200).json("User has been created.")
        })


    })  
    
}
export const updateTokenEmail = (req, res)=>{
    const query = `SELECT * FROM users WHERE email = ?`;
    const emailToken = crypto.randomBytes(64).toString("hex");
    db.query(query,[req.body.email] ,(err, dataUser) => {
        if (err) return res.status(500).json(err);
        else{
            const queryUpdate = "UPDATE users SET `emailToken` = ? WHERE email = ?";
            db.query(queryUpdate, [emailToken ,req.body.email ], (err, data) => {
                if (err) return res.status(500).json(err);
                resetPassVerificationEmail(dataUser[0].idUser, dataUser[0].name,req.body.email,emailToken)
                return res.status(200).json("token has been update!");
            });
        }
    })
        
}



// a97c93021aefaf93d50b7f3a9513d08dbdc69f0af320b590e4a2e9ac7826a48d86a6a3d1d10427ed24bf679f04b8bc2dbce99e4bd7d9e113ffeb236cac02f545
export const verifyEmail = async (req, res) => {
    const emailToken = req.body.emailToken;
    if (!emailToken) {
      return res.status(404).json({ message: "Email token not found..." });
    }
    const query = "SELECT * FROM users WHERE emailToken = ?";
    db.query(query, [emailToken], (err, user) => {
      if (err) return res.status(500).json({ message: err });
      if (user.length !== 0) {
        const queryUpdate = "UPDATE users SET emailToken = ?, isVerify = ? WHERE idUser = ?";
        db.query(queryUpdate, [null, 1, user[0].idUser], (err, data) => {
          if (err) return res.status(500).json({ message: err });
          res.status(200).json({
            isVerfied: 1,
          });
        });
      } else {
        res.status(404).json({ message: "Email verification failed, invalid Token!" });
      }
    });
  };
  

export const login = (req, res) =>{
    const query = "SELECT * FROM users where email = ?" 
    db.query(query,[req.body.email], (err, data) =>{
        if(err)
           {    return res.status(500).json(err);   }
        if(data.length=== 0){
            return res.status(404).json("User not found!");
        }

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword)
            return res.status(400).json('Gmail or password incorrect!')
       
            
            const token = jwt.sign({id:data[0].idUser}, 'secretkey',{expiresIn:'365d'})
            const {password, ...orthers} = data[0];
            res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Thời gian sống 365 ngày
            maxAge: 365 * 24 * 60 * 60 * 1000, // Thời gian sống 365 ngày
            secure: true
          
        }).status(200).json(orthers);
    })
}

export const logout = (req, res) =>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out!")
}

export const loginMethodSuccess = (req, res) => {
    try {
      if (req.user) {
        res.status(200).json({
          success: true,
          message: "successfull",
          user: req.user,
        });
      } else {
        res.status(403).json({ error: true, message: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };
export const loginMethodFail = (req, res) =>{
    res.status(401).json({
        success: false,
        message: "failure",
      });
}
export const logoutMethod = (req, res)=>{
    req.logout();
    res.redirect(CLIENT_URL);
}
