-- CreateTable
CREATE TABLE "Quote" (
    "quote_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "inop_fee" DOUBLE PRECISION NOT NULL,
    "enclosed_fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("quote_id")
);
