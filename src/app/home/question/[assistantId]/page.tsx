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
import SpinnerComponent from "@/components/spinner-component";

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
  const [disabled, setDisabled] = useState<boolean>(true);

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
      if (questions.some((q) => q.pending)) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };
    fetchData();
  }, [params.assistantId, user?.id, questions]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (questions.some((q) => q.pending)) {
        setDisabled(true);
        const questionsData = await getQuestionsAction(
          user?.id!,
          params.assistantId
        );
        setQuestions(questionsData);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [questions, user?.id, params.assistantId]);

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
    <div className="flex h-screen w-screen ">
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
                key={index}
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
              Hello, {user?.name ?? "how are you?"}
            </p>
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground px-4">
              How can I help you today?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 m-4">
              {questionCardLists.map((questionCardList, index) => (
                <QuestionCard
                  key={index}
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
            disabled={disabled}
          />
          <div className="pl-4">
            <Button type="submit" disabled={loading || disabled} variant={"outline"}>
              {loading ? <SpinnerComponent /> : <SendIcon />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskPage;
