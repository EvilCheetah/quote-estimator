/*
  Warnings:

  - The primary key for the `postal-to-postal-distance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `distance_id` on the `postal-to-postal-distance` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "postal-to-postal-distance_first_postal_code_node_id_second__key";

-- AlterTable
ALTER TABLE "postal-to-postal-distance" DROP CONSTRAINT "postal-to-postal-distance_pkey",
DROP COLUMN "distance_id",
ADD CONSTRAINT "postal-to-postal-distance_pkey" PRIMARY KEY ("first_postal_code_node_id", "second_postal_code_node_id");
