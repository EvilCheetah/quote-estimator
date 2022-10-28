-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Make" (
    "make_id" SERIAL NOT NULL,
    "make_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("make_id")
);

-- CreateTable
CREATE TABLE "Model" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "Dimensions" (
    "dimensions_id" SERIAL NOT NULL,
    "model_id" INTEGER NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Dimensions_pkey" PRIMARY KEY ("dimensions_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" SERIAL NOT NULL,
    "state_name" TEXT NOT NULL,
    "state_abbreviation" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "PostalCode" (
    "postal_code_id" SERIAL NOT NULL,
    "postal_code_value" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PostalCode_pkey" PRIMARY KEY ("postal_code_id")
);

-- CreateTable
CREATE TABLE "Distance" (
    "distance_id" SERIAL NOT NULL,
    "position_one" INTEGER NOT NULL,
    "position_two" INTEGER NOT NULL,
    "air_distance" DOUBLE PRECISION NOT NULL,
    "ground_distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Distance_pkey" PRIMARY KEY ("distance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dimensions_model_id_key" ON "Dimensions"("model_id");

-- CreateIndex
CREATE UNIQUE INDEX "State_state_name_key" ON "State"("state_name");

-- CreateIndex
CREATE UNIQUE INDEX "City_state_id_city_name_key" ON "City"("state_id", "city_name");

-- CreateIndex
CREATE UNIQUE INDEX "PostalCode_postal_code_value_key" ON "PostalCode"("postal_code_value");

-- CreateIndex
CREATE UNIQUE INDEX "Distance_position_one_position_two_key" ON "Distance"("position_one", "position_two");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "Make"("make_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dimensions" ADD CONSTRAINT "Dimensions_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("model_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("state_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalCode" ADD CONSTRAINT "PostalCode_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distance" ADD CONSTRAINT "Distance_position_one_fkey" FOREIGN KEY ("position_one") REFERENCES "PostalCode"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distance" ADD CONSTRAINT "Distance_position_two_fkey" FOREIGN KEY ("position_two") REFERENCES "PostalCode"("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE;
