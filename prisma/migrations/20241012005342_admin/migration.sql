/*
  Warnings:

  - The values [COMPLETED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
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

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password",
ADD COLUMN     "name" TEXT NOT NULL;
