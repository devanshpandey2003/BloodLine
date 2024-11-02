/*
  Warnings:

  - The values [COMPLETED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `BloodRequest` table. All the data in the column will be lost.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "BloodRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "RequestHistory" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BloodRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TABLE "RequestHistory" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
ALTER TABLE "BloodRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "RequestHistory" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "BloodRequest" DROP CONSTRAINT "BloodRequest_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_bloodType_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BloodRequest" DROP COLUMN "adminId",
ADD COLUMN     "requestApprovedEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requestRejectedEmail" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "ReminderEmailDate" TIMESTAMP(3),
ADD COLUMN     "campRegistractionEmail" BOOLEAN DEFAULT false,
ALTER COLUMN "hasDonated" DROP NOT NULL,
ALTER COLUMN "hasSentEmail" DROP NOT NULL;

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
