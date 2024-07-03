"use client";
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

const AssistantCard: NextPage<Props> = ({ data }) => {
  return (
    <Button variant={"ghost"} className="flex justify-start m-2">
      <Link
        href={`/dashboard/assistant/assistant/${data.assistantId}`}
        className="flex flex-row items-center"
      >
        <Avatar>
          <AvatarImage src={data.image ?? ""} />
          <AvatarFallback>{data.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 flex flex-col items-start justify-start">
          <p className="text-sm font-medium leading-none">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.model
              .split("-")
              .map(
                (text) => `${text.replace(text[0], text[0].toUpperCase())} `
              )}
          </p>
        </div>
      </Link>
    </Button>
  );
};

export default AssistantCard;
