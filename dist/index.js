"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const node_cron_1 = __importDefault(require("node-cron"));
const sendDetailsProspect_1 = require("./EmailServices/sendDetailsProspect");
const sendHospitalLoginEmail_1 = require("./EmailServices/sendHospitalLoginEmail");
// import { sendDonationReminder } from "./EmailServices/sendBloodDonationReminder";
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hi there from backgroundServices');
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`BackgroundServices is listening on port ${port}`);
});
const runScheduledTasks = () => {
    // Running the task daily at midnight
    node_cron_1.default.schedule('* * * * *', () => {
        console.log('Running the scheduled task every second!');
        (0, sendDetailsProspect_1.sendDetailsProspectEmail)();
        (0, sendHospitalLoginEmail_1.sendHospitalLoginEmail)();
        // sendDonationReminder();
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
};
runScheduledTasks();
// Graceful shutdown of Prisma client
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Closing Prisma client...');
    yield prisma.$disconnect();
    process.exit(0);
}));
