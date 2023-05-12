import { db } from "../connectbd.js";
import bcrypt from "bcryptjs"
import moment from "moment/moment.js";
import { nanoid } from 'nanoid';
import jwt  from "jsonwebtoken";
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
        const query = "INSERT INTO users (`idUser`, `email`,`password`,`name`,`avatar`, `status`, `role`, `date_create`, `address`, `phoneNumber`) VALUES (?)"

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
        ]
        db.query(query,[values], (err ,data)=>{
            if(err)
           {    return res.status(500).json(err);   }
           return res.status(200).json("User has been created.")
        })

        console.log(values);

    })  
    
}

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
       
            
            const token = jwt.sign({id:data[0].idUser}, 'secretkey')
            const {password, ...orthers} = data[0];
        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: 'none',
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