"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import {
  addQuestionAction,
  getQuestionsAction,
  getUserAction,
  searchAssistantAction,
} from "@/lib/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Assistant, Question } from "@prisma/client";
import { SendIcon } from "lucide-react";
import { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import QuestionCard from "@/components/question-card";
import ChatCard from "@/components/chat-card";
import { Input } from "@/components/ui/input";
import { User } from "next-auth";

interface Params {
  params: {
    assistantId: string;
  };
}

const AskPage: NextPage<Params> = ({ params }) => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserAction();
      // const assistantsData = await getAssistantAction();
      const assistantData = await searchAssistantAction(params.assistantId);
      const questionsData = await getQuestionsAction(
        userData?.id!,
        params.assistantId
      );
      // setAssistants(assistantsData);
      setAssistant(assistantData);
      setQuestions(questionsData);
      setUser(userData!);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (questions.some((q) => q.pending)) {
        const questionsData = await getQuestionsAction(
          user?.id!,
          params.assistantId
        );
        setQuestions(questionsData);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [questions]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setQuestion("");
      setLoading(true);
      await addQuestionAction(params.assistantId, user?.id!, question);
      toast({
        title: "Message sent successfully",
        description: `The message has been received by Dr. ${assistant?.name}. Please wait for the doctor's validation`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      const questionsData = await getQuestionsAction(
        user?.id!,
        params.assistantId
      );
      setQuestions(questionsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "failed to send message",
        description: `Unexpected Error`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  };

  const handleQuestionClick = async (questionText: string) => {
    try {
      setLoading(true);
      await addQuestionAction(params.assistantId, user?.id!, questionText);
      const questionsData = await getQuestionsAction(
        user?.id!,
        params.assistantId
      );
      setLoading(false);
      setQuestions(questionsData);
      toast({
        title: "Message sent successfully",
        description: `The message has been received by Dr. ${assistant?.name}. Please wait for the doctor's validation`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "failed to send message",
        description: `Unexpected Error`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  };

  const questionCardLists = [
    "My hands are sore from working too much",
    "I have a headache from coding",
    "I forgot to straighten my legs and now I'm in pain",
    "Eye bags never go away",
  ];

  return (
    <div className="flex h-screen w-screen">
      {/* <div className="w-1/4 hidden h-screen border-r bg-primary md:flex justify-between flex-col">
        <div>
          <p className="p-4 font-semibold text-muted-foreground">
            Try another Assistant
          </p>
          {assistants.map((assistant) => {
            return (
              <div className="mr-4">
                <AssistantHistoryCard data={assistant} />
              </div>
            );
          })}
        </div>
        <div className="text-secondary p-4 hover:bg-neutral-800 rounded-lg m-2 flex items-center">
          <Activity></Activity>
          <div className="pl-4">
            <p className="font-medium">Upgrade Plan</p>
            <p className="text-muted-foreground">
              Get Gemini Pro Vision, and more models
            </p>
          </div>
        </div>
      </div> */}
      <div className="flex w-full justify-start items-start md:items-center md:justify-between flex-col pb-16">
        {questions.length ? (
          <ScrollArea className="border-t-transparent w-full h-full bg-red rounded-md border p-4 flex flex-col justify-end items-end px-4 lg:px-52">
            {questions.map((question, index) => (
              <ChatCard
                data={{
                  key: index,
                  avatar: { user: user!, assistant: assistant! },
                  question: question,
                }}
              />
            ))}
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-start justify-start pb-20 pt-48">
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 inline-block text-transparent bg-clip-text px-4">
              Hello, {user?.email ?? "How Are You?"}
            </p>
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground px-4">
              How can I help you today?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 m-4">
              {questionCardLists.map((questionCardList) => (
                <QuestionCard
                  text={questionCardList}
                  onClick={handleQuestionClick}
                />
              ))}
            </div>
          </div>
        )}

        <form
          className="p-4 flex items-center fixed w-screen bg-secondary border bottom-0 px-4 lg:px-52"
          onSubmit={handleSubmit}
        >
          <Input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            name="question"
            required
            placeholder="Send message..."
          />
          <div className="pl-4">
            <Button type="submit" disabled={loading} variant={"outline"}>
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-200 fill-gray-900"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <SendIcon />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskPage;
