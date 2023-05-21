/*
  Warnings:

  - The primary key for the `NhlBracketPick` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "NhlBracketPick" DROP CONSTRAINT "NhlBracketPick_pkey",
ADD CONSTRAINT "NhlBracketPick_pkey" PRIMARY KEY ("userId", "round", "season", "seriesCode");
