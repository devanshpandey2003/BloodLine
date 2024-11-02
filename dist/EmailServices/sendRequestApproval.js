"use strict";
// import ejs from "ejs";
// import { PrismaClient } from "@prisma/client";
// import dotenv from "dotenv";
// import { sendEmail } from "../helpers/sendEmail";
// dotenv.config();
// const prisma = new PrismaClient();
// export const sendRequestApprovalEmail = async () => {
//     const approvedRequests  = await prisma.bloodRequest.findMany({
//         where: {
//             status: "APPROVED",
//             requestApprovedEmail: false
//         },
//         select: {
//             id:true,
//             quantity:true,
//             bloodType: true,
//             hospitalId: true
//         }
//     });
//     const hospital = await prisma.hospital.findUnique({
//         where: {
//             id: hospitalId
//         }
//     })
//     if(approvedRequests.length > 0) {
//         for (let approvedRequest of approvedRequests) {
//             ejs.renderFile(
//                 "src/template/BloodRequestApproved.ejs",
//                 {
//                     hospitalName: approvedRequest.hospital.name
//                 }
//             )
//         }
//     }
// }
