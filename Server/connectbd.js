import mysql from "mysql"
import dotenv from "dotenv"; 
dotenv.config();
export const db = mysql.createConnection({
    host:'dbpetfamily.cufjvcm4k50o.ap-southeast-2.rds.amazonaws.com',
    port:3306,
    user:'admin',
    password:'1992001zZ',
    database:'dbpetfamily',
    charset: 'utf8mb4',
    connectTimeout: 20000,
})

db.connect((err)=>{
   if(err)
    {
        console.log(err.message);
        return;
   }
   console.log("database connected");
})

