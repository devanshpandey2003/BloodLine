-- AlterTable
ALTER TABLE "BloodRequest" ADD COLUMN     "requestApprovedEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requestRejectedEmail" BOOLEAN NOT NULL DEFAULT false;
