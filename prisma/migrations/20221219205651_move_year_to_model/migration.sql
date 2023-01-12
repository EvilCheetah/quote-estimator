/*
  Warnings:

  - You are about to drop the column `year` on the `vehicle-make` table. All the data in the column will be lost.
  - Added the required column `vehicle_type_id` to the `vehicle-model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `vehicle-model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle-make" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "vehicle-model" ADD COLUMN     "vehicle_type_id" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicle-model" ADD CONSTRAINT "vehicle-model_vehicle_type_id_fkey" FOREIGN KEY ("vehicle_type_id") REFERENCES "vehicle-type"("vehicle_type_id") ON DELETE CASCADE ON UPDATE CASCADE;
