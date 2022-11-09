/*
  Warnings:

  - A unique constraint covering the columns `[country_abbreviation]` on the table `country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "country_country_abbreviation_key" ON "country"("country_abbreviation");
