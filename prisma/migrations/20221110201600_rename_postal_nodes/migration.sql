/*
  Warnings:

  - You are about to drop the column `air_distance` on the `postal-to-postal-distance` table. All the data in the column will be lost.
  - You are about to drop the column `position_one` on the `postal-to-postal-distance` table. All the data in the column will be lost.
  - You are about to drop the column `position_two` on the `postal-to-postal-distance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[first_postal_code_node_id,second_postal_code_node_id]` on the table `postal-to-postal-distance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_postal_code_node_id` to the `postal-to-postal-distance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_postal_code_node_id` to the `postal-to-postal-distance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "postal-to-postal-distance" DROP CONSTRAINT "postal-to-postal-distance_position_one_fkey";

-- DropForeignKey
ALTER TABLE "postal-to-postal-distance" DROP CONSTRAINT "postal-to-postal-distance_position_two_fkey";

-- DropIndex
DROP INDEX "postal-to-postal-distance_position_one_position_two_key";

-- AlterTable
ALTER TABLE "postal-to-postal-distance" DROP COLUMN "air_distance",
DROP COLUMN "position_one",
DROP COLUMN "position_two",
ADD COLUMN     "first_postal_code_node_id" INTEGER NOT NULL,
ADD COLUMN     "second_postal_code_node_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "postal-to-postal-distance_first_postal_code_node_id_second__key" ON "postal-to-postal-distance"("first_postal_code_node_id", "second_postal_code_node_id");

-- AddForeignKey
ALTER TABLE "postal-to-postal-distance" ADD CONSTRAINT "postal-to-postal-distance_first_postal_code_node_id_fkey" FOREIGN KEY ("first_postal_code_node_id") REFERENCES "postal-code"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-to-postal-distance" ADD CONSTRAINT "postal-to-postal-distance_second_postal_code_node_id_fkey" FOREIGN KEY ("second_postal_code_node_id") REFERENCES "postal-code"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;
