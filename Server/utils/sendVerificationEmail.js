import { createMailTransporter } from "./createMailTransporter.js"

export const sendVerificationEmail = (name, email, emailToken)=>{
    console.log(process.env.CLIENT_URL);
    console.log(name, email, emailToken);
    const transporter = createMailTransporter();
    const mailOptions = {
        from: '"PetFamily" <petfamily.site@gmail.com>',
        to: email,
        subject: "Verify your email...",
        html: `<p>Hello 👋 ${name}, verify your email by clicking this link: </p>
            <a href="${process.env.CLIENT_URL}/verify-email?emailToken=${emailToken}">Verify Your Email</a>
        `
    }  
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) console.log(error); 
        else console.log("Verifiation email send");
    })
}
export const resetPassVerificationEmail = (id, name, email, emailToken)=>{
    // console.log(process.env.CLIENT_URL);
    // console.log(name, email, emailToken);
    const transporter = createMailTransporter();
    const mailOptions = {
        from: '"PetFamily" <petfamily.site@gmail.com>',
        to: email,
        subject: "Verify your email to reset your password...",
        html: `<p>Hello 👋 ${name}, reset your password by clicking this link: </p>
            <a href="${process.env.CLIENT_URL}/reset-password?emailToken=${emailToken}&idUser=${id}">${process.env.CLIENT_URL}/reset-password?emailToken=${emailToken}</a>
        `
    }  
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) console.log(error); 
        else console.log("reset pass email send");
    })
}