/*
  Warnings:

  - The primary key for the `NhlBracketPick` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NhlBracketPick` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NhlBracketPick" DROP CONSTRAINT "NhlBracketPick_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "NhlBracketPick_pkey" PRIMARY KEY ("userId", "teamId", "round", "season", "seriesCode");
