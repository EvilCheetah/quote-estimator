/*
  Warnings:

  - You are about to drop the column `city_id` on the `postal-code` table. All the data in the column will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `postal-code-edges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_vehicle_model_id_fkey";

-- DropForeignKey
ALTER TABLE "postal-code" DROP CONSTRAINT "postal-code_city_id_fkey";

-- DropForeignKey
ALTER TABLE "postal-code-edges" DROP CONSTRAINT "postal-code-edges_child_node_id_fkey";

-- DropForeignKey
ALTER TABLE "postal-code-edges" DROP CONSTRAINT "postal-code-edges_node_id_fkey";

-- AlterTable
ALTER TABLE "postal-code" DROP COLUMN "city_id",
ADD COLUMN     "country_id" INTEGER;

-- DropTable
DROP TABLE "Quote";

-- DropTable
DROP TABLE "postal-code-edges";

-- CreateTable
CREATE TABLE "postal-codes-in-cities" (
    "postal_code_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "postal-codes-in-cities_pkey" PRIMARY KEY ("city_id","postal_code_id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "quote_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "vehicle_model_id" INTEGER NOT NULL,
    "is_operational" BOOLEAN NOT NULL,
    "is_enclosed" BOOLEAN NOT NULL,
    "reservation" TEXT,
    "exact_date" TIMESTAMP(3),
    "from_lat" DOUBLE PRECISION NOT NULL,
    "from_long" DOUBLE PRECISION NOT NULL,
    "to_lat" DOUBLE PRECISION NOT NULL,
    "to_long" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION,
    "quote_estimate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("quote_id")
);

-- AddForeignKey
ALTER TABLE "postal-code" ADD CONSTRAINT "postal-code_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-codes-in-cities" ADD CONSTRAINT "postal-codes-in-cities_postal_code_id_fkey" FOREIGN KEY ("postal_code_id") REFERENCES "postal-code"("postal_code_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-codes-in-cities" ADD CONSTRAINT "postal-codes-in-cities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_vehicle_model_id_fkey" FOREIGN KEY ("vehicle_model_id") REFERENCES "vehicle-model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;
