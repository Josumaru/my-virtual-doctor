import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NextPage } from "next";
import { AvatarImage } from "./ui/avatar";
import { Assistant, Question } from "@prisma/client";
import { User } from "next-auth";
import SpinnerComponent from "./spinner-component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

interface Props {
  data: {
    key: number;
    avatar: {
      user: User;
      assistant: Assistant;
    };
    question: Question;
  };
}

const ChatCard: NextPage<Props> = ({ data }) => {
  const questionText = data.question.question;
  const answerText = data.question.pending ? "Pending" : data.question.answer!;
  const formattedText = answerText
    .replace(/\* \*\*([A-Za-z]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\* \*\*([A-Za-z]+)\*+/g, "<strong>$1</strong>");
    // .replace(/\* ([A-Za-z]+)(\w*\s*)*/g, "<li>$1</li>");

  const [text, setText] = useState(".");

  useEffect(() => {
    const messages = [".", "..", "...."];
    let index = 0;

    const interval = setInterval(() => {
      setText(messages[index]);
      index = (index + 1) % messages.length;
    }, 2000); // ganti interval sesuai keinginan

    return () => clearInterval(interval);
  }, []);

  const getTime = () => {
    const createdAt = new Date(data.question.createdAt);
    const updatedAt = new Date(data.question.updatedAt);
    const now = new Date();

    // Function to format time as "h:mm AM/PM"
    const formatTime = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date);
    };

    if (createdAt.toDateString() === now.toDateString()) {
      return `Today at ${formatTime(updatedAt)}`;
    } else {
      return createdAt.toLocaleDateString();
    }
  };

  return (
    <div key={data.key}>
      <div
        className={`flex items-start justify-end ${
          data.key == 0 ? "pt-20" : ""
        }`}
      >
        <div className="m-2 flex flex-col">
          <div className="flex text-sm items-center justify-end">
            <p className="pr-2">{data.avatar.user.name}</p>
            <p className="text-muted-foreground text-xs">{getTime()}</p>
          </div>
          <div
            className="bg-primary rounded-lg text-secondary p-2 ml-20 md:ml-56"
            dangerouslySetInnerHTML={{ __html: questionText }}
          />
        </div>
        <Avatar className="mt-7">
          <AvatarFallback>
            {data.avatar.user.name?.split(" ").map((name) => name[0])}
          </AvatarFallback>
          <AvatarImage src={data.avatar.user.image!} />
        </Avatar>
      </div>
      <div className={"flex items-start justify-start"}>
        <Avatar className="mt-7">
          <AvatarFallback>
            {data.avatar.assistant.name?.split(" ").map((name) => name[0])}
          </AvatarFallback>
          <AvatarImage src={data.avatar.assistant.image} />
        </Avatar>
        <div className="m-2 mr-20 md:mr-56 flex flex-col">
          <div className="flex text-sm items-center">
            <p className="pr-2">{data.avatar.assistant.name}</p>
            <p className="text-muted-foreground text-xs">{getTime()}</p>
          </div>
          {data.question.pending ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="bg-primary rounded-lg text-secondary p-2 flex items-center">{text}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please wait for doctor validation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div
              className="bg-primary rounded-lg text-secondary p-2"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
