import prisma from "@/lib/db";
import { Assistant } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getAssistantAction } from "@/lib/actions";

interface Props {}

const TopAssistantComponent: NextPage<Props> = async ({}) => {
  let assistants: Assistant[] = [];

  try {
    assistants = await getAssistantAction();
    assistants.sort()
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col w-full overflow-y-scroll h-screen no-scrollbar sm:pt-24">
      <b className="p-1 font-bold text-sm hidden lg:block">Top Assistant</b>
      <div className="grid grid-cols-3 gap-1 m-4">
        {assistants.slice(0, 3).map((assistant, index) => {
          let order = ["", "order-first pt-4", "order-last pt-4"];
          return (
            <div key={"question-container"} className={`flex items-center justify-center ${order[index]}`}>
              <Link
                href={`/home/question/${assistant.assistantId}`}
                className="h-full flex flex-col items-center justify-center w-full p-5 rounded-lg hover:bg-neutral-200"
              >
                <Avatar className="h-20 w-20">
                  <AvatarFallback>{assistant.name[0]}</AvatarFallback>
                  <AvatarImage src={assistant.image} />
                </Avatar>
                <div className="h-full w-auto flex flex-col items-center">
                  <p className="text-sm font-bold">
                    {assistant.name.split(" ")[0]}
                  </p>
                  <p className="font-bold text-red-500">{assistant.point} <span className="text-sm font-normal">pts</span></p>
                  <p className="text-xs text-muted-foreground text-center">
                    {assistant.model
                      .split("-")
                      .map(
                        (text) =>
                          `${text.replace(text[0], text[0].toUpperCase())} `
                      )}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        {assistants?.slice(3).map((assistant, index) => (
          <div key={assistant.assistantId} className="w-auto">
            <Link
              href={`/home/question/${assistant.assistantId}`}
              className="flex hover:bg-neutral-200 m-1 p-2 w-auto justify-between items-center bg-neutral-100 rounded-lg"
            >
              <div className="flex items-center">
                <Avatar>
                  <AvatarFallback>{assistant.name[0]}</AvatarFallback>
                  <AvatarImage src={assistant.image} />
                </Avatar>
                <div className="pl-2">
                  <p className="font-medium text-sm">
                    {`Dr. ${assistant.name}`}
                    <span className="pl-4 text-sm text-muted-foreground">{`#${
                      index + 4
                    }`}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {assistant.model
                      .split("-")
                      .map(
                        (text) =>
                          `${text.replace(text[0], text[0].toUpperCase())} `
                      )}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-red-500">
                {assistant.point}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAssistantComponent;
