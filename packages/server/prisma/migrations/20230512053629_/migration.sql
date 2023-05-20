/*
  Warnings:

  - Added the required column `firstYearOfPlay` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "firstYearOfPlay" TEXT NOT NULL,
ADD COLUMN     "locationName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Playoff" (
    "id" SERIAL NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "Playoff_pkey" PRIMARY KEY ("id")
);
