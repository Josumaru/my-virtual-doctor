-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_assistantId_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_userId_fkey";

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "assistantAssistantId" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'patient';

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_assistantAssistantId_fkey" FOREIGN KEY ("assistantAssistantId") REFERENCES "assistant"("assistantId") ON DELETE SET NULL ON UPDATE CASCADE;
