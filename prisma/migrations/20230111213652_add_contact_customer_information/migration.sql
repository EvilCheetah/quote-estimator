/*
  Warnings:

  - Added the required column `email` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT;
