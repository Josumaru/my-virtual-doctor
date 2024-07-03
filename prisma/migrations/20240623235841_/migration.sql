-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
