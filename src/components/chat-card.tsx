import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NextPage } from "next";
import { AvatarImage } from "./ui/avatar";
import { Assistant, Question } from "@prisma/client";
import { User } from "next-auth";

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
    .replace(/\* \*\*([A-Za-z]+)\*+/g, "<strong>$1</strong>").replaceAll("*", "")
    // .replace(/\* ([A-Za-z]+)(\w*\s*)*/g, "<li>$1</li>");

  return (
    <div key={data.key}>
      <div
        className={`flex items-center justify-end ${
          data.key == 0 ? "pt-20" : ""
        }`}
      >
        <div
          className="bg-primary rounded-lg text-secondary p-2 m-2 ml-20 md:ml-56"
          dangerouslySetInnerHTML={{ __html: questionText }}
        />
        <Avatar>
          <AvatarFallback>
            {data.avatar.user.name?.split(" ").map((name) => name[0])}
          </AvatarFallback>
          <AvatarImage src={data.avatar.user.image!} />
        </Avatar>
      </div>
      <div className={"flex items-center"}>
        <Avatar>
          <AvatarFallback>
            {data.avatar.assistant.name?.split(" ").map((name) => name[0])}
          </AvatarFallback>
          <AvatarImage src={data.avatar.assistant.image} />
        </Avatar>
        <div
          className="bg-primary rounded-lg text-secondary p-2 m-2 mr-20 md:mr-56"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </div>
    </div>
  );
};

export default ChatCard;
