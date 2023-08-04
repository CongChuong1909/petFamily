import mysql from "mysql"
import dotenv from "dotenv"; 
dotenv.config();
export const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbpetsocial',
    charset: 'utf8mb4'
})

