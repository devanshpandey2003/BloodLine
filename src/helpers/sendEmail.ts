import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function createTransporter({config}: {config: any}) {
    const transporter = nodemailer.createTransport(config);
    return transporter;
}

let configuration = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

export const sendEmail = async (messageOption: any) => {  // messageOption passed as an argument
    const transporter = createTransporter({config: configuration});
    
    try {
      
        await transporter.verify();
        console.log("Server is ready to take our messages");

        
        await transporter.sendMail(messageOption, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent successfully:", info);
            }
        });
    } catch (error) {
        console.error("Error in sending email:", error);
    }
};


