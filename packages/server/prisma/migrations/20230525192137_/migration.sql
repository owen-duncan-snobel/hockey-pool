/*
  Warnings:

  - You are about to drop the column `valueAmount` on the `NhlBracketPick` table. All the data in the column will be lost.
  - You are about to drop the `NhlBracketValue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `NhlBracketPick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NhlBracketPick" DROP CONSTRAINT "NhlBracketPick_round_valueAmount_fkey";

-- AlterTable
ALTER TABLE "NhlBracketPick" DROP COLUMN "valueAmount",
ADD COLUMN     "value" INTEGER NOT NULL;

-- DropTable
DROP TABLE "NhlBracketValue";
