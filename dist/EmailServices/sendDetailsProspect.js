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
exports.sendDetailsProspectEmail = void 0;
const ejs_1 = __importDefault(require("ejs"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const sendEmail_1 = require("../helpers/sendEmail");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const sendDetailsProspectEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const prospects = yield prisma.donor.findMany({
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
            ejs_1.default.renderFile("src/template/BloodDonationProspects.ejs", {
                donorName: prospect.name,
                donorAge: prospect.age,
                bloodType: prospect.bloodType,
                donorAddress: prospect.address,
                donorWeight: prospect.weight,
            }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield (0, sendEmail_1.sendEmail)(messageOption);
                    console.log(`Email sent to ${prospect.email}`);
                    yield prisma.donor.update({
                        where: { donor_id: prospect.donor_id },
                        data: { hasSentEmail: true },
                    });
                }
                catch (error) {
                    console.error("Error sending email:", error);
                }
            }));
        }
    }
    else {
        console.log("No prospects found for sending emails.");
    }
});
exports.sendDetailsProspectEmail = sendDetailsProspectEmail;
module.exports = { sendDetailsProspectEmail: exports.sendDetailsProspectEmail };
