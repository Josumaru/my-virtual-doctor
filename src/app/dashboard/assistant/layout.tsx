"use client";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BotIcon, InboxIcon } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AssistantLayout: NextPage<Props> = ({ children }) => {
  const [selectedNav, setSelectedNav] = useState<string>("assistant");

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="border rounded-lg h-full"
    >
      <ResizablePanel defaultSize={15}>
        <div className="border-b pr-2"></div>
        <div className="w-auto flex flex-col">
          <Button variant={"ghost"} className="justify-between">
            <div className="flex flex-row">
              <BotIcon />
              <Link
                onClick={() => {
                  setSelectedNav("assistant");
                }}
                href={"/dashboard/assistant/assistant"}
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
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      {children}
    </ResizablePanelGroup>
  );
};

export default AssistantLayout;
