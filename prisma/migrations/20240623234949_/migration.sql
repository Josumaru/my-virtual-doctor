/*
  Warnings:

  - You are about to drop the column `assistantAssistantId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_assistantAssistantId_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_userId_fkey";

-- AlterTable
ALTER TABLE "question" DROP COLUMN "assistantAssistantId",
DROP COLUMN "tags",
DROP COLUMN "title";

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "assistant"("assistantId") ON DELETE CASCADE ON UPDATE CASCADE;
