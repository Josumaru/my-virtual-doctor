"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NextPage } from "next";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getAllQuestionsAction } from "@/lib/actions";
import { Assistant, Question, User } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  detail: React.ReactNode;
}
type QuestionType = Question & {
  user: User;
  assistant: Assistant;
};


const AssistantLayout: NextPage<Props> = ({ detail }) => {

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  
  const fetchData = async () => {
    const data =   await getAllQuestionsAction();
    setQuestions(data!);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      fetchData();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [questions]);
  return (
    <>
      <ResizablePanel defaultSize={60} className="flex flex-col h-full">
        <div className="border-b pr-2">
          <div className="flex justify-between items-center w-full m-1">
            <b className="text-xl font-bold pl-2">Inbox</b>
            <Link href="/dashboard/assistant/assistant/add">
              <Button variant={"default"}>
                <p>New Assistant</p>
                <PlusIcon />
              </Button>
            </Link>
          </div>
        </div>
        <ResizablePanel defaultSize={60} className="flex flex-col">
          <ScrollArea>
            {questions.map((question, index) => {
              return (
                <Link href={`/dashboard/assistant/inbox/${question.questionId}`} key={index}>
                  <div className="w-auto border p-1 m-1 rounded-lg hover:bg-neutral-100 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="font-semibold">{question?.user.name}</p>
                      <p className="ml-auto text-xs text-foreground">{`${question.createdAt.toDateString()}`}</p>
                    </div>
                    <p className="text-xs font-medium">
                      {`Dr. ${question.assistant.name}`}
                    </p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {question.question}
                    </p>
                    <div className="flex gap-1 my-1">
                      <Badge variant="default">
                        {question.pending ? "Pending" : "Valid"}
                      </Badge>
                      <Badge variant="default">
                        {question.questionId.slice(-4)}
                      </Badge>
                      <Badge variant="default">
                        {question.assistant.model}
                      </Badge>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel defaultSize={25}>{detail}</ResizablePanel>
    </>
  );
};

export default AssistantLayout;
