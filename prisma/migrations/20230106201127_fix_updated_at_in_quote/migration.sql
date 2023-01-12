/*
  Warnings:

  - The primary key for the `Quote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `quote_estimate` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_pkey",
ADD COLUMN     "quote_estimate" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "quote_id" DROP DEFAULT,
ALTER COLUMN "quote_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Quote_pkey" PRIMARY KEY ("quote_id");
DROP SEQUENCE "Quote_quote_id_seq";
