/*
  Warnings:

  - Added the required column `assistantId` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question" ADD COLUMN     "assistantId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "assistant"("assistantId") ON DELETE CASCADE ON UPDATE CASCADE;
