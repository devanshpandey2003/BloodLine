CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "role" TEXT NOT NULL,
  "donorId" INTEGER UNIQUE,
  "adminId" INTEGER UNIQUE,
  "hospitalId" INTEGER UNIQUE,
  UNIQUE("donorId"),
  UNIQUE("adminId"),
  UNIQUE("hospitalId"),
  CONSTRAINT "FK_donorId" FOREIGN KEY ("donorId") REFERENCES "Donor"("donor_id") ON DELETE SET NULL,
  CONSTRAINT "FK_adminId" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL,
  CONSTRAINT "FK_hospitalId" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL
);

CREATE TABLE "Admin" (
  "id" SERIAL PRIMARY KEY,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("email")
);

CREATE TABLE "Donor" (
  "donor_id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "bloodType" TEXT NOT NULL,
  "contact" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "disease" TEXT NOT NULL,
  "age" INTEGER NOT NULL,
  "weight" INTEGER NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "hasSentEmail" BOOLEAN DEFAULT FALSE,
  "ReminderEmailDate" TIMESTAMP,
  "campRegistractionEmail" BOOLEAN DEFAULT FALSE,
  "hasDonated" BOOLEAN DEFAULT FALSE,
  "lastDonation" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("email")
);

CREATE TABLE "Hospital" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "address" TEXT NOT NULL,
  "contact" TEXT NOT NULL,
  UNIQUE("email")
);

CREATE TABLE "BloodInventory" (
  "id" SERIAL PRIMARY KEY,
  "bloodType" TEXT NOT NULL UNIQUE,
  "quantity" INTEGER NOT NULL
);

CREATE TABLE "DonationCamp" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "CampRegistration" (
  "id" SERIAL PRIMARY KEY,
  "donorId" INTEGER NOT NULL,
  "campId" INTEGER NOT NULL,
  "registeredAt" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "FK_donorId" FOREIGN KEY ("donorId") REFERENCES "Donor"("donor_id") ON DELETE CASCADE,
  CONSTRAINT "FK_campId" FOREIGN KEY ("campId") REFERENCES "DonationCamp"("id") ON DELETE CASCADE
);

CREATE TABLE "Donation" (
  "id" SERIAL PRIMARY KEY,
  "donorId" INTEGER NOT NULL,
  "bloodType" TEXT NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "quantity" INTEGER NOT NULL,
  CONSTRAINT "FK_donorId" FOREIGN KEY ("donorId") REFERENCES "Donor"("donor_id") ON DELETE CASCADE,
  CONSTRAINT "FK_bloodType" FOREIGN KEY ("bloodType") REFERENCES "BloodInventory"("bloodType") ON DELETE SET NULL
);

CREATE TABLE "BloodRequest" (
  "id" SERIAL PRIMARY KEY,
  "hospitalId" INTEGER NOT NULL,
  "bloodType" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "status" TEXT DEFAULT 'PENDING',
  "requestDate" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "FK_hospitalId" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE
);

CREATE TABLE "RequestHistory" (
  "id" SERIAL PRIMARY KEY,
  "requestId" INTEGER NOT NULL,
  "status" TEXT DEFAULT 'PENDING',
  "changedAt" TIMESTAMP DEFAULT NOW(),
  "comment" TEXT,
  CONSTRAINT "FK_requestId" FOREIGN KEY ("requestId") REFERENCES "BloodRequest"("id") ON DELETE CASCADE
);

CREATE TABLE "BloodDelivery" (
  "id" SERIAL PRIMARY KEY,
  "requestId" INTEGER UNIQUE,
  "deliveryDate" TIMESTAMP DEFAULT NOW(),
  "status" TEXT DEFAULT 'ON_THE_WAY',
  CONSTRAINT "FK_requestId" FOREIGN KEY ("requestId") REFERENCES "BloodRequest"("id") ON DELETE CASCADE
);

CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "DeliveryStatus" AS ENUM ('ON_THE_WAY', 'CANCELLED');
CREATE TYPE "UserRole" AS ENUM ('DONOR', 'ADMIN', 'HOSPITAL');
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
