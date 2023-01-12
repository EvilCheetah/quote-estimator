/*
  Warnings:

  - Added the required column `full_model_name` to the `vehicle-model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle-model" ADD COLUMN     "full_model_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "vehicle-type" (
    "vehicle_type_id" SERIAL NOT NULL,
    "vehicle_type_name" TEXT NOT NULL,

    CONSTRAINT "vehicle-type_pkey" PRIMARY KEY ("vehicle_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle-type_vehicle_type_name_key" ON "vehicle-type"("vehicle_type_name");
