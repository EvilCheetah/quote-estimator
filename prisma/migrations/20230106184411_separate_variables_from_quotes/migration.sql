/*
  Warnings:

  - You are about to drop the `quote-values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "quote-values";

-- CreateTable
CREATE TABLE "quote-variables" (
    "quote_variable_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "inoperational_fee" DOUBLE PRECISION NOT NULL,
    "enclosed_fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "quote-variables_pkey" PRIMARY KEY ("quote_variable_id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "quote_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "vehicle_model_id" INTEGER NOT NULL,
    "is_operational" BOOLEAN NOT NULL,
    "is_enclosed" BOOLEAN NOT NULL,
    "reservation" TEXT,
    "exact_date" TIMESTAMP(3),
    "lat_from" DOUBLE PRECISION NOT NULL,
    "long_from" DOUBLE PRECISION NOT NULL,
    "lat_to" DOUBLE PRECISION NOT NULL,
    "long_to" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("quote_id")
);

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_vehicle_model_id_fkey" FOREIGN KEY ("vehicle_model_id") REFERENCES "vehicle-model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;
