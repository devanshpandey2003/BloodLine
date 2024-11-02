import ejs from "ejs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { sendEmail } from "../helpers/sendEmail";

dotenv.config();

const prisma = new PrismaClient();

export const sendHospitalLoginEmail = async () => {
 
  const hospitals = await prisma.hospital.findMany({
    where: {
      hasSentLoginEmail: false
    },
    select: {
      id: true,  
      name: true,
      address: true,
      email: true,
    },
  });

  if (hospitals.length > 0) {
    for (let hospital of hospitals) {
      ejs.renderFile(
        "src/template/HospitalLoginEmail.ejs", 
        {
          hospitalName: hospital.name,          
          hospitalAddress: hospital.address,
        },
        async (err: any, data: any) => {
          if (err) {
            console.error("Error rendering email template:", err);
            return;
          }

          let messageOption = {
            from: process.env.EMAIL,
            to: hospital.email,
            subject: "BloodLine: We Value Your Contribution",
            html: data,
          };

          try {
           
            await sendEmail(messageOption);
            console.log(`Email sent to ${hospital.email}`);

           
            await prisma.hospital.update({
              where: { id: hospital.id },
              data: { hasSentLoginEmail: true },
            });
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
      );
    }
  } else {
    console.log("No prospects found for sending emails.");
  }
};

module.exports = { sendHospitalLoginEmail };
