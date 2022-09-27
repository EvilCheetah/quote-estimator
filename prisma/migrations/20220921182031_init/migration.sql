-- CreateTable
CREATE TABLE "Make" (
    "make_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "make_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Model" (
    "model_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model_name" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "Model_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "Make" ("make_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dimensions" (
    "dimensions_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model_id" INTEGER NOT NULL,
    "length" REAL NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    CONSTRAINT "Dimensions_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model" ("model_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dimensions_model_id_key" ON "Dimensions"("model_id");
