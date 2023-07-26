import nodemailer from 'nodemailer'
import dotenv from "dotenv"; 
dotenv.config();
export const createMailTransporter = ()=>{
    console.log(process.env.PASSWORD_GMAIL);
    const transporter = nodemailer.createTransport({
        service:'gmail',
        port:465,
        secure: true,
        secureConnection: false,
        auth:{
            user: "petfamily.site@gmail.com",
            pass: process.env.PASSWORD_GMAIL
        }
    })
    return transporter
}