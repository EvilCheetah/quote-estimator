/*
  Warnings:

  - You are about to drop the column `lat_from` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `lat_to` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `long_from` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `long_to` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `from_lat` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from_long` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_lat` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_long` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "lat_from",
DROP COLUMN "lat_to",
DROP COLUMN "long_from",
DROP COLUMN "long_to",
ADD COLUMN     "from_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "from_long" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "to_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "to_long" DOUBLE PRECISION NOT NULL;
