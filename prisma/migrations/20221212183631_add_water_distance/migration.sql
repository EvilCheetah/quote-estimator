/*
  Warnings:

  - You are about to drop the column `ground_distance` on the `postal-code-edges` table. All the data in the column will be lost.
  - Added the required column `land_distance` to the `postal-code-edges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `water_distance` to the `postal-code-edges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "postal-code-edges" DROP COLUMN "ground_distance",
ADD COLUMN     "land_distance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "water_distance" DOUBLE PRECISION NOT NULL;
