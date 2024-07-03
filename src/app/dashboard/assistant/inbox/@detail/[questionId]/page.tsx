"use client";
import { NextPage } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Archive,
  ArchiveX,
  Edit3Icon,
  SendHorizonalIcon,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  deleteQuestionAction,
  forwardQuestionAction,
  getQuestionAction,
} from "@/lib/actions";
import Link from "next/link";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Assistant, Question, User } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Params {
  params: {
    questionId: string;
  };
}


const QuestionDetailPage: NextPage<Params> = ({ params }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [assistant, setAssistant] = useState<Assistant | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      toast({
        title: "Fetching Question",
        description: `Please wait while fetching ${params.questionId}`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      try {
        const question = await getQuestionAction(params.questionId);
        setQuestion(question);
        setUser(question?.user!);
        setAssistant(question?.assistant!);
        toast({
          title: "Fetching Question Done",
          description: `Response from Dr. ${assistant?.name} Loaded`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      } catch (error) {
        toast({
          title: "Fetching Failed",
          description: `Fail to load ${params.questionId}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }
    };
    fetchQuestion();
  }, [params.questionId]);

  const handleForward = async () => {
    toast({
      title: "Forwarding",
      description: `Fail to load ${params.questionId}`,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
    try {
      const response = await forwardQuestionAction(params.questionId);
      toast({
        title: "Forwarded",
        description: `Response from Dr. ${assistant?.name}`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      return response;
    } catch (error) {
      toast({
        title: "Forwarding Failed",
        description: `Fail to forward the responses from Dr. ${assistant?.name}`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      return error;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="border-b p-1 flex justify-between h-auto">
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <form>
                <TooltipTrigger asChild>
                  <Button variant={"ghost"}>
                    <ArchiveX size={16} />
                  </Button>
                </TooltipTrigger>
              </form>
              <TooltipContent>
                <p>Deletea</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <form>
                <TooltipTrigger asChild>
                  <Button variant={"ghost"}>
                    <Archive size={16} />
                  </Button>
                </TooltipTrigger>
              </form>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <form
                action={async () => {
                  await deleteQuestionAction(params.questionId);
                }}
              >
                <TooltipTrigger asChild>
                  <Button variant={"ghost"}>
                    <Trash size={16} />
                  </Button>
                </TooltipTrigger>
              </form>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <form>
              <TooltipTrigger asChild>
                <Link
                  href={`/dashboard/assistant/inbox/edit/${params.questionId}`}
                >
                  <Button type="button" variant={"ghost"}>
                    <Edit3Icon size={16} />
                  </Button>
                </Link>
              </TooltipTrigger>
            </form>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {question ? (
        <div className="h-full">
          <div className="flex border-b">
            <Avatar className="m-2">
                <AvatarImage src={assistant?.image} />
                <AvatarFallback>{assistant?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground pr-1">
                    {question?.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <p className="line-clamp-1 text-xs">{assistant?.model}</p>
                <p className="line-clamp-1 text-xs">{`Reply-To: ${user?.email}`}</p>
              </div>
          </div>

          <div className="p-4">
            <span>
              <strong>Question: </strong>
            </span>
            <p>{question?.question}</p>
          </div>
          <div className="h-full p-4">
            <span>
              <strong>Answer: </strong>
            </span>
            <div className="h-full grid grid-rows-2">
              <div
                className={`${styles.noscrollbar} text-sm overflow-y-auto`}
              >
                <p> {question?.answer?.trim()}</p>
              </div>
              <div>
                <form action={handleForward}>
                  <Button className="w-full" type="submit">
                    <p className="pr-2">Forward</p>
                    <SendHorizonalIcon />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default QuestionDetailPage;
