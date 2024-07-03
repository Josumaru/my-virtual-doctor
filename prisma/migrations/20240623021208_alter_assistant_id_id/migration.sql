-- DropIndex
DROP INDEX "assistant_assistantId_key";

-- AlterTable
ALTER TABLE "assistant" ADD CONSTRAINT "assistant_pkey" PRIMARY KEY ("assistantId");
