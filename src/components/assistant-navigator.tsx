"use client";
import { NextPage } from "next";
import { Button } from "./ui/button";
import { BotIcon, InboxIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {}

const AssistantNavigator: NextPage<Props> = ({}) => {
  const [selectedNav, setSelectedNav] = useState<string>("assistant");
  return (
    <div className="w-auto flex flex-col">
      <Button variant={"ghost"} className="justify-between">
        <div className="flex flex-row">
          <BotIcon />
          <Link
            onClick={() => {
              setSelectedNav("assistant");
            }}
            href={"/dashboard/assistant/"}
            className={`inline-flex items-center text-sm px-3 font-medium ${
              selectedNav === "assistant" ? "" : "text-muted-foreground"
            }`}
          >
            Assistant
          </Link>
        </div>
        <p>23</p>
      </Button>
      <Button variant={"ghost"} className="justify-between">
        <div className="flex flex-row">
          <InboxIcon />
          <Link
            onClick={() => {
              setSelectedNav("inbox");
            }}
            href={"/dashboard/assistant/inbox"}
            className={`inline-flex items-center text-sm px-3 font-medium ${
              selectedNav === "inbox" ? "" : "text-muted-foreground"
            }`}
          >
            Inbox
          </Link>
        </div>
        <p>23</p>
      </Button>
    </div>
  );
};

export default AssistantNavigator;
