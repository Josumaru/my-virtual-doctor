"use client"
import { NextPage } from "next";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Children } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  data: {
    name: string;
    model: string;
    image: string;
    point: number;
    assistantId: string;
  };
}

const AssistantHistoryCard: NextPage<Props> = ({ data }) => {
  return (
    <div className="flex justify-start w-full hover:bg-neutral-800 rounded-lg m-2">
      <Link href={`/home/question/${data.assistantId}`} className="flex flex-row items-center m-5">
        <Avatar>
          <AvatarImage src={data.image ?? ""}/>
          <AvatarFallback>{data.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 text-secondary flex flex-col items-start justify-start">
          <p className="text-sm font-medium leading-none">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.model}</p>
        </div>
      </Link>
    </div>
  );
};

export default AssistantHistoryCard;
