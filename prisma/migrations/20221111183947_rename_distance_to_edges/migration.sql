/*
  Warnings:

  - You are about to drop the `postal-to-postal-distance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "postal-to-postal-distance" DROP CONSTRAINT "postal-to-postal-distance_first_postal_code_node_id_fkey";

-- DropForeignKey
ALTER TABLE "postal-to-postal-distance" DROP CONSTRAINT "postal-to-postal-distance_second_postal_code_node_id_fkey";

-- DropTable
DROP TABLE "postal-to-postal-distance";

-- CreateTable
CREATE TABLE "postal-code-edges" (
    "node_id" INTEGER NOT NULL,
    "child_node_id" INTEGER NOT NULL,
    "ground_distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "postal-code-edges_pkey" PRIMARY KEY ("node_id","child_node_id")
);

-- AddForeignKey
ALTER TABLE "postal-code-edges" ADD CONSTRAINT "postal-code-edges_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "postal-code"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-code-edges" ADD CONSTRAINT "postal-code-edges_child_node_id_fkey" FOREIGN KEY ("child_node_id") REFERENCES "postal-code"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;
