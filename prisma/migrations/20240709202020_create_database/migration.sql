-- CreateTable
CREATE TABLE "Sports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "playersPerTeam" INTEGER NOT NULL,
    "rulesUrl" TEXT NOT NULL,

    CONSTRAINT "Sports_pkey" PRIMARY KEY ("id")
);
