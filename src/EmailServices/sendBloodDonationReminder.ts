// import ejs from "ejs";
// import { PrismaClient } from "@prisma/client";
// import dotenv from "dotenv";
// import { sendEmail } from "../helpers/sendEmail";


// dotenv.config();


// export const prisma = new PrismaClient();

// const formatDate = (date: Date): string => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); 
//   const day = String(date.getDate()).padStart(2, '0'); 
//   return `${year}/${month}/${day}`;
// };

// export const sendDonationReminder = async () => {

//   const donorsToRemind = await prisma.donor.findMany({
//     where: {
//       hasDonated: true,
//     },
//     select: {
//       donor_id: true,
//       name: true,
//       lastDonation: true,
//       email: true,
//       address: true,
//       bloodType: true,
//       weight: true,
//       age: true
//     },
//   });

//   if (donorsToRemind.length > 0) {
//     for (let donor of donorsToRemind) {
      
//       const today: Date = new Date();
//       const donorLastDonation: Date = new Date(donor.lastDonation!); 
      
      
//       const diffDate: number = Math.abs(today.getTime() - donorLastDonation.getTime());
      
     
//       const daysSinceLastDonation: number = Math.floor(diffDate / (1000 * 60 * 60 * 24));
      
//       if (daysSinceLastDonation > 60) {


//         ejs.renderFile(
//           "templates/DonationReminder.ejs",
//           {
//             donorName: donor.name,
//             donorLastDoinationDate: donor.lastDonation
//           },

//           async (err, data) => {
//             if (err) {
//               console.error("Error rendering email template:", err);
//               return;
//             }

//             const messageOption = {
//               from: process.env.EMAIL,
//               to: donor.email,
//               subject: "Reminder: Your Next Donation Opportunity",
//               html: data,
//             };

//             try {
//               await sendEmail(messageOption);
//             const formattedDate =   formatDate(today);
//             const updateDonor =  
//               console.log(`Reminder email sent to ${donor.email}`);
//             } catch (error) {
//               console.error("Error sending reminder email:", error);
//             }
//           }

//         );
//       }
//     }
//   } else {
//     console.log("No donors to remind.");
//   }
// };