import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";
import cron from 'node-cron';
import { sendDetailsProspectEmail } from "./EmailServices/sendDetailsProspect";
import { sendHospitalLoginEmail } from "./EmailServices/sendHospitalLoginEmail";
// import { sendDonationReminder } from "./EmailServices/sendBloodDonationReminder";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hi there from backgroundServices');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`BackgroundServices is listening on port ${port}`);
});



const runScheduledTasks = () => {
    // Running the task daily at midnight
    cron.schedule('* * * * *', () => {
        console.log('Running the scheduled task every second!');
        sendDetailsProspectEmail();
        sendHospitalLoginEmail();
        // sendDonationReminder();
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
};

runScheduledTasks();

// Graceful shutdown of Prisma client
process.on('SIGINT', async () => {
    console.log('Closing Prisma client...');
    await prisma.$disconnect();
    process.exit(0);
});
