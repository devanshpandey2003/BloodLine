/*
  Warnings:

  - You are about to drop the column `adminId` on the `BloodRequest` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "BloodRequest" DROP CONSTRAINT "BloodRequest_adminId_fkey";

-- AlterTable
ALTER TABLE "BloodRequest" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "ReminderEmailDate" TIMESTAMP(3),
ADD COLUMN     "campRegistractionEmail" BOOLEAN DEFAULT false,
ADD COLUMN     "hasSentEmail" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "DonationCamp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DonationCamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampRegistration" (
    "id" SERIAL NOT NULL,
    "donorId" INTEGER NOT NULL,
    "campId" INTEGER NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampRegistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampRegistration" ADD CONSTRAINT "CampRegistration_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("donor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampRegistration" ADD CONSTRAINT "CampRegistration_campId_fkey" FOREIGN KEY ("campId") REFERENCES "DonationCamp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
