/*
  Warnings:

  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Quote";

-- CreateTable
CREATE TABLE "quote-values" (
    "quote_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "inoperational_fee" DOUBLE PRECISION NOT NULL,
    "enclosed_fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "quote-values_pkey" PRIMARY KEY ("quote_id")
);
