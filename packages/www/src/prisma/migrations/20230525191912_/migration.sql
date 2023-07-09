/*
  Warnings:

  - You are about to drop the column `valueId` on the `NhlBracketPick` table. All the data in the column will be lost.
  - The primary key for the `NhlBracketValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NhlBracketValue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[round,season,seriesCode]` on the table `NhlSeries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `valueAmount` to the `NhlBracketPick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NhlBracketPick" DROP CONSTRAINT "NhlBracketPick_valueId_fkey";

-- AlterTable
ALTER TABLE "NhlBracketPick" DROP COLUMN "valueId",
ADD COLUMN     "valueAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NhlBracketValue" DROP CONSTRAINT "NhlBracketValue_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "NhlBracketValue_pkey" PRIMARY KEY ("round", "value");

-- CreateIndex
CREATE UNIQUE INDEX "NhlSeries_round_season_seriesCode_key" ON "NhlSeries"("round", "season", "seriesCode");

-- AddForeignKey
ALTER TABLE "NhlBracketPick" ADD CONSTRAINT "NhlBracketPick_round_valueAmount_fkey" FOREIGN KEY ("round", "valueAmount") REFERENCES "NhlBracketValue"("round", "value") ON DELETE RESTRICT ON UPDATE CASCADE;
