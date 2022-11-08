/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dimensions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Distance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Make` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostalCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_state_id_fkey";

-- DropForeignKey
ALTER TABLE "Dimensions" DROP CONSTRAINT "Dimensions_model_id_fkey";

-- DropForeignKey
ALTER TABLE "Distance" DROP CONSTRAINT "Distance_position_one_fkey";

-- DropForeignKey
ALTER TABLE "Distance" DROP CONSTRAINT "Distance_position_two_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_make_id_fkey";

-- DropForeignKey
ALTER TABLE "PostalCode" DROP CONSTRAINT "PostalCode_city_id_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Dimensions";

-- DropTable
DROP TABLE "Distance";

-- DropTable
DROP TABLE "Make";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "PostalCode";

-- DropTable
DROP TABLE "State";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "refresh_token" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "vehicle-make" (
    "make_id" SERIAL NOT NULL,
    "make_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "vehicle-make_pkey" PRIMARY KEY ("make_id")
);

-- CreateTable
CREATE TABLE "vehicle-model" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "vehicle-model_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "vehicle-dimensions" (
    "dimensions_id" SERIAL NOT NULL,
    "model_id" INTEGER NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "vehicle-dimensions_pkey" PRIMARY KEY ("dimensions_id")
);

-- CreateTable
CREATE TABLE "country" (
    "country_id" SERIAL NOT NULL,
    "country_name" TEXT NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "state" (
    "state_id" SERIAL NOT NULL,
    "state_name" TEXT NOT NULL,
    "state_abbreviation" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "postal-code" (
    "postal_code_id" SERIAL NOT NULL,
    "postal_code_value" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "postal-code_pkey" PRIMARY KEY ("postal_code_id")
);

-- CreateTable
CREATE TABLE "postal-to-postal-distance" (
    "distance_id" SERIAL NOT NULL,
    "position_one" INTEGER NOT NULL,
    "position_two" INTEGER NOT NULL,
    "air_distance" DOUBLE PRECISION NOT NULL,
    "ground_distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "postal-to-postal-distance_pkey" PRIMARY KEY ("distance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle-make_make_name_key" ON "vehicle-make"("make_name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle-model_make_id_model_name_key" ON "vehicle-model"("make_id", "model_name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle-dimensions_model_id_key" ON "vehicle-dimensions"("model_id");

-- CreateIndex
CREATE UNIQUE INDEX "country_country_name_key" ON "country"("country_name");

-- CreateIndex
CREATE UNIQUE INDEX "state_state_name_key" ON "state"("state_name");

-- CreateIndex
CREATE UNIQUE INDEX "city_state_id_city_name_key" ON "city"("state_id", "city_name");

-- CreateIndex
CREATE UNIQUE INDEX "postal-code_postal_code_value_key" ON "postal-code"("postal_code_value");

-- CreateIndex
CREATE UNIQUE INDEX "postal-to-postal-distance_position_one_position_two_key" ON "postal-to-postal-distance"("position_one", "position_two");

-- AddForeignKey
ALTER TABLE "vehicle-model" ADD CONSTRAINT "vehicle-model_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "vehicle-make"("make_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle-dimensions" ADD CONSTRAINT "vehicle-dimensions_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle-model"("model_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("state_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-code" ADD CONSTRAINT "postal-code_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-to-postal-distance" ADD CONSTRAINT "postal-to-postal-distance_position_one_fkey" FOREIGN KEY ("position_one") REFERENCES "postal-code"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postal-to-postal-distance" ADD CONSTRAINT "postal-to-postal-distance_position_two_fkey" FOREIGN KEY ("position_two") REFERENCES "postal-code"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;
