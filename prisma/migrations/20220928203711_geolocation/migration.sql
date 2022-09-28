-- CreateTable
CREATE TABLE "State" (
    "state_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state_name" TEXT NOT NULL,
    "state_abbreviation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city_name" TEXT NOT NULL,
    "state_id" INTEGER NOT NULL,
    CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State" ("state_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PostalCode" (
    "postal_code_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postal_code_value" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    CONSTRAINT "PostalCode_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City" ("city_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Distance" (
    "distance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position_one" INTEGER NOT NULL,
    "position_two" INTEGER NOT NULL,
    "air_distance" REAL NOT NULL,
    "ground_distance" REAL NOT NULL,
    CONSTRAINT "Distance_position_one_fkey" FOREIGN KEY ("position_one") REFERENCES "PostalCode" ("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Distance_position_two_fkey" FOREIGN KEY ("position_two") REFERENCES "PostalCode" ("postal_code_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "State_state_name_key" ON "State"("state_name");

-- CreateIndex
CREATE UNIQUE INDEX "City_state_id_city_name_key" ON "City"("state_id", "city_name");

-- CreateIndex
CREATE UNIQUE INDEX "PostalCode_postal_code_value_key" ON "PostalCode"("postal_code_value");

-- CreateIndex
CREATE UNIQUE INDEX "Distance_position_one_position_two_key" ON "Distance"("position_one", "position_two");
