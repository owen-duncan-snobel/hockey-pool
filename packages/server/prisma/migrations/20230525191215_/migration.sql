/*
  Warnings:

  - Added the required column `valueId` to the `NhlBracketPick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NhlBracketPick" ADD COLUMN     "valueId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "NhlBracketPick" ADD CONSTRAINT "NhlBracketPick_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "NhlBracketValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
