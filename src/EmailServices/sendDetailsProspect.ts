import ejs from "ejs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { sendEmail } from "../helpers/sendEmail";

dotenv.config();

const prisma = new PrismaClient();

export const sendDetailsProspectEmail = async () => {
 
  const prospects = await prisma.donor.findMany({
    where: {
      hasDonated: false,
      hasSentEmail: false 
    },
    select: {
      donor_id: true,  
      name: true,
      age: true,
      bloodType: true,
      address: true,
      disease: true,
      weight: true,
      email: true,
    },
  });

  if (prospects.length > 0) {
    for (let prospect of prospects) {
      ejs.renderFile(
        "src/template/BloodDonationProspects.ejs", 
        {
          donorName: prospect.name,
          donorAge: prospect.age,
          bloodType: prospect.bloodType,
          donorAddress: prospect.address,
          donorWeight: prospect.weight,
        },
        async (err: any, data: any) => {
          if (err) {
            console.error("Error rendering email template:", err);
            return;
          }

          let messageOption = {
            from: process.env.EMAIL,
            to: prospect.email,
            subject: "BloodLine: We Value Your Contribution",
            html: data,
          };

          try {
           
            await sendEmail(messageOption);
            console.log(`Email sent to ${prospect.email}`);

           
            await prisma.donor.update({
              where: { donor_id: prospect.donor_id },
              data: { hasSentEmail: true },
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

module.exports = { sendDetailsProspectEmail };
