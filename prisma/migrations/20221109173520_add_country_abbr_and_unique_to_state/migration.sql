/*
  Warnings:

  - A unique constraint covering the columns `[state_abbreviation]` on the table `state` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[country_id,state_name]` on the table `state` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country_abbreviation` to the `country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "country" ADD COLUMN     "country_abbreviation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "state_state_abbreviation_key" ON "state"("state_abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "state_country_id_state_name_key" ON "state"("country_id", "state_name");
